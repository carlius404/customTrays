"use client";

import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface SocialsProps {
	isPending: boolean;
}

const Socials = ({ isPending }: SocialsProps) => {
	const onClick = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="flex flex-col space-y-2">
			<Button
				variant="outline"
				type="button"
				disabled={isPending}
				onClick={() => onClick("google")}
			>
				<Icons.google className="mr-2 h-4 w-4" />
				Google
			</Button>
			<Button
				variant="outline"
				type="button"
				disabled={isPending}
				onClick={() => onClick("github")}
			>
				<Icons.gitHub className="mr-2 h-4 w-4" />
				GitHub
			</Button>
		</div>
	);
};

export default Socials;
