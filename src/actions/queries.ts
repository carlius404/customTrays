import prisma from "@/lib/prisma";

export const getAllTrays = async () => {
	return await prisma.tray.findMany();
};

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email },
	});
};

export const getUserById = async (id: string) => {
	return await prisma.user.findUnique({
		where: { id },
	});
};

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

export const getPasswordUpdateTokenByToken = async (token: string) => {
	try {
		const passwordUpdateToken = await prisma.passwordUpdateToken.findUnique({
			where: {
				token,
			},
		});
		return passwordUpdateToken;
	} catch {
		return null;
	}
};

export const getPasswordUpdateTokenByEmail = async (email: string) => {
	try {
		const passwordUpdateToken = await prisma.passwordUpdateToken.findFirst({
			where: {
				email,
			},
		});
		return passwordUpdateToken;
	} catch {
		return null;
	}
};
