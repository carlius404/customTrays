import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import React from "react";

const ForgotPasswordPage = () => {
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Reset your Password</h1>
				<p className="text-sm text-muted-foreground">Enter your email to reset your password</p>
			</div>
			<ForgotPasswordForm />
		</>
	);
};

export default ForgotPasswordPage;
