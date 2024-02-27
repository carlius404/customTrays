import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<div className="inline-flex justify-center items-center space-x-4">
					<ExclamationTriangleIcon className="size-7" />
					<h1 className="text-2xl font-semibold tracking-tight">Oops...</h1>
				</div>
				<p className="text-md text-muted-foreground">Something went wrong</p>
			</div>
			<Link href="/auth/login" className="mx-auto w-max">
				<Button className="px-8">Back to Login</Button>
			</Link>
		</>
	);
};

export default ErrorPage;
