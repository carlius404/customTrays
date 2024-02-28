"use server";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { SignupResponse } from "@/lib/utils";
import { loginSchema, signupSchema } from "@/shemas";
import { getUserByEmail } from "@/actions/queries";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export async function createUser(data: z.infer<typeof signupSchema>): Promise<SignupResponse> {
	console.log(data);
	const validatedFields = signupSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: { message: "invalid fields" } };
	}

	const { username: name, email, password } = validatedFields.data;
	const hashedPassword = await bcryptjs.hash(password, 10);

	const existingUser = await getUserByEmail(email);
	console.log("existingUser", existingUser);

	if (existingUser) {
		return { error: { message: "Email already in use!" } };
	}

	const createdUser = await prisma.user
		.create({
			data: { name, email, password: hashedPassword },
		})
		.catch((e) => {
			return e;
		});
	const verificationToken = await generateVerificationToken(email);
	return { user: createdUser };
}

export const login = async (data: z.infer<typeof loginSchema>) => {
	const validatedFields = loginSchema.safeParse(data);
	if (!validatedFields.success) {
		return { error: { message: "invalid fields" } };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: { message: "Email does not exist" } };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = generateVerificationToken(existingUser.email);
		return { error: { message: "Confirmation email sent" } };
	}

	try {
		await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return { error: { message: "Invalid credentials" } };
				}
				default: {
					return { error: { message: "Something went wrong" } };
				}
			}
		}
		throw error;
	}
};
