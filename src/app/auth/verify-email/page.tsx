import EmailVerificationForm from "@/components/auth/email-verification-form";
import Link from "next/link";
import React from "react";

const VerifyEmailPage = () => {
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Verifying your account...</h1>
				<p className="text-sm text-muted-foreground">This should only take a few seconds</p>
			</div>
			<EmailVerificationForm />
			<div className="text-sm inline-block mx-auto">
				<Link href="/auth/login" className="-foreground underline">
					Back to Login
				</Link>
			</div>
		</>
	);
};

export default VerifyEmailPage;
