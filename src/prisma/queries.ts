import { cache } from "react";
import prisma from "./prisma";

export const getAllTrays = cache(async () => {
	return await prisma.tray.findMany();
});
