import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid4 } from "uuid";
import prisma from "@/lib/prisma";

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
