import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import React from "react";

const UpdatePasswordPage = () => {
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Update your Password</h1>
				<p className="text-sm text-muted-foreground">Enter a new password</p>
			</div>
			<UpdatePasswordForm />
		</>
	);
};

export default UpdatePasswordPage;
