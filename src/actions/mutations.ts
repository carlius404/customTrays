"use server";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { SignupResponse } from "@/lib/utils";
import { LoginSchema, ForgotPasswordSchema, SignupSchema, UpdatePasswordSchema } from "@/shemas";
import { getPasswordUpdateTokenByToken, getUserByEmail } from "@/actions/queries";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generatePasswordUpdateToken, generateVerificationToken } from "@/lib/tokens";
import { getVerificationTokenByToken } from "@/actions/queries";
import { sendPasswordUpdateEmail, sendVerificationEmail } from "@/lib/mail";

export const createUser = async (data: z.infer<typeof SignupSchema>) => {
	console.log(data);
	const validatedFields = SignupSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" };
	}

	const { username: name, email, password } = validatedFields.data;
	const hashedPassword = await bcryptjs.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: "Email already in use!" };
	}

	await prisma.user
		.create({
			data: { name, email, password: hashedPassword },
		})
		.catch((e) => {
			return e;
		});
	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);

	return { success: "Confirmation email sent!" };
};

export const login = async (data: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(data);
	if (!validatedFields.success) {
		return { error: "Invalid fields!" };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "Email does not exist!" };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);
		await sendVerificationEmail(verificationToken.email, verificationToken.token);
		return { error: "Confirmation email sent!" };
	}

	try {
		await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return { error: "Invalid credentials" };
				}
				default: {
					return { error: "Something went wrong" };
				}
			}
		}
		throw error;
	}
};

export const emailVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: "Invalid token" };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return { error: "Token has expired!" };
	}
	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "Email does not exist!" };
	}

	await prisma.user.update({
		where: { id: existingUser.id },
		data: { emailVerified: new Date(), email: existingToken.email },
	});

	await prisma.verificationToken.delete({ where: { id: existingToken.id } });

	return { success: "Email verified!" };
};

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
	const validatedFields = ForgotPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid email!" };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: "Email does not exist!" };
	}

	const passwordUpdateToken = await generatePasswordUpdateToken(email);
	await sendPasswordUpdateEmail(passwordUpdateToken.email, passwordUpdateToken.token);

	return { success: "Email sent!" };
};

export const updatePassword = async (
	values: z.infer<typeof UpdatePasswordSchema>,
	token: string | null
) => {
	if (!token) {
		return { error: "Invalid token1!" };
	}

	const validatedFields = UpdatePasswordSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid password!" };
	}

	const { password } = validatedFields.data;
	const existingToken = await getPasswordUpdateTokenByToken(token);
	if (!existingToken) {
		return { error: "Invalid token!" };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: "Email does not exist!" };
	}

	const hashedPassword = await bcryptjs.hash(password, 10);
	await prisma.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});

	await prisma.passwordUpdateToken.delete({ where: { id: existingToken.id } });

	return { success: "Password updated!" };
};
