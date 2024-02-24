import { z } from "zod";

export const signupSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(8),
	email: z.string().email(),
});

export const loginSchema = z.object({
	password: z.string().min(8),
	email: z.string().email(),
});
