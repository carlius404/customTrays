"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "./prisma";
import { ErrorMsg, UserInput } from "./types";
import { User } from "@prisma/client";

export async function createUser(data: UserInput): Promise<User | ErrorMsg[]> {
	"use server";
	const { username, email, password } = data;
	const userSchema = z.object({
		username: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
	});
	try {
		userSchema.parse({
			username,
			email,
			password,
		});
	} catch (e) {
		if (e instanceof z.ZodError) {
			return e.issues.map((i) => {
				return {
					message: i.message,
					field: i.path[0],
				} as ErrorMsg;
			});
		} else {
			return [{ message: "An error occurred" }];
		}
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const createdUser = await prisma.user
		.create({
			data: { username, email, password: hashedPassword },
		})
		.catch((e) => {
			return [{ message: e.message }];
		});
	return createdUser;
}
