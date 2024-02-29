import { z } from "zod";

const passwordLength = 6;

export const SignupSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(passwordLength, {
		message: `Password must be at least ${passwordLength} characters`,
	}),
	email: z.string().email({
		message: "Email is invalid",
	}),
});

export const LoginSchema = z.object({
	password: z.string().min(passwordLength, {
		message: `Password must be at least ${passwordLength} characters`,
	}),
	email: z.string().email({
		message: "Email is invalid",
	}),
});

export const ForgotPasswordSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
});

export const UpdatePasswordSchema = z.object({
	password: z.string().min(passwordLength, {
		message: `Password must be at least ${passwordLength} characters`,
	}),
});
