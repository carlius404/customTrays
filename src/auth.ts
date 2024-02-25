import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";
import { getUserById } from "./actions/queries";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		// async signIn({ user }) {
		// 	if (!user.id) {
		// 		return false;
		// 	}
		// 	const existingUser = await getUserById(user.id);
		// 	if (!existingUser || !existingUser.emailVerified) {
		// 		return false;
		// 	}
		// 	return true;
		// },
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		async jwt({ token }) {
			console.log("jwt token", token);
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});