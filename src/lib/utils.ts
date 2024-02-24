import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface ErrorMsg {
	field?: string;
	message: string;
}

export interface SignupResponse {
	user?: User;
	error?: ErrorMsg;
}
