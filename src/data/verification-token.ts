import prisma from "@/lib/prisma";

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await prisma.verificationToken.findUnique({
			where: {
				token: token,
			},
		});
		return verificationToken;
	} catch {
		return null;
	}
};

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await prisma.verificationToken.findFirst({
			where: {
				email: email,
			},
		});
		return verificationToken;
	} catch {
		return null;
	}
};
