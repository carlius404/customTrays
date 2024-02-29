import { getVerificationTokenByEmail } from "@/actions/queries";
import { v4 as uuid4 } from "uuid";
import prisma from "@/lib/prisma";
import { getPasswordUpdateTokenByEmail } from "@/actions/queries";

export const generateVerificationToken = async (email: string) => {
	const token = uuid4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const verificationToken = await prisma.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationToken;
};

export const generatePasswordUpdateToken = async (email: string) => {
	const token = uuid4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordUpdateTokenByEmail(email);

	if (existingToken) {
		await prisma.passwordUpdateToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const passwordUpdateToken = await prisma.passwordUpdateToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return passwordUpdateToken;
};
