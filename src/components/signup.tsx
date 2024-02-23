"use client";
import React, { useState } from "react";
import { createUser } from "../prisma/mutations";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleCreateUser = async () => {
		const response = await createUser({ username, email, password });
		console.log("response", response);
		if (!(response instanceof Array)) {
			setUsername("");
			setEmail("");
			setPassword("");
		}
	};

	return (
		<form action={handleCreateUser}>
			<fieldset>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					className="bg-inherit border outline-none border-[#383a3e]"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</fieldset>
			<fieldset>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					name="email"
					className="bg-inherit border outline-none border-[#383a3e]"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</fieldset>
			<fieldset>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					className="bg-inherit border outline-none border-[#383a3e]"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</fieldset>
			<button type="submit">Create user</button>
		</form>
	);
};

export default Signup;
