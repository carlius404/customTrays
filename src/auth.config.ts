import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import { loginSchema } from "@/shemas";
import { getUserByEmail } from "./actions/queries";

export default {
	providers: [
		credentials({
			async authorize(credentials) {
				const validatedFields = loginSchema.safeParse(credentials);

				console.log("validatedFields", validatedFields);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordsMatch = await bcryptjs.compare(password, user.password);

					if (passwordsMatch) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
