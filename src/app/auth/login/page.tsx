import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Custom Trays - Login",
	description: "Login to your account to access your custom trays and orders",
};

export default function LoginPage() {
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
				<p className="text-sm text-muted-foreground">Enter your email or username to log in</p>
			</div>
			<LoginForm />
		</>
	);
}
