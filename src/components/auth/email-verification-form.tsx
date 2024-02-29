"use client";

import { emailVerification } from "@/actions/mutations";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

const EmailVerificationForm = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError("Missing token");
			return;
		}

		emailVerification(token)
			.then((res) => {
				setError(res.error);
				setSuccess("Email verified!");
			})
			.catch((e) => {
				setError("Something went wrong");
			});
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit, success, error]);

	return (
		<div className="mx-auto">
			{!success && !error && <BeatLoader color="white" />}
			<FormSuccess message={success} />
			{!success && <FormError message={error} />}
		</div>
	);
};

export default EmailVerificationForm;
