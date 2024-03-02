"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/mutations";

const Settings = () => {
	const user = useCurrentUser();
	return (
		<div>
			{JSON.stringify(user)}
			<form
				action={() => {
					logout();
				}}
			>
				<Button type="submit">Sign Out</Button>
			</form>
		</div>
	);
};

export default Settings;
