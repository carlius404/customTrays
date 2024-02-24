import prisma from "../prisma";

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
