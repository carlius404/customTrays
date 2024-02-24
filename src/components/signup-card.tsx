"use client";
import React, { useState } from "react";
import { createUser } from "@/actions/mutations";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	username: z.string().min(2).max(50),
	email: z.string().email(),
	password: z.string().min(8),
});

const SignupCard = () => {
	// const [username, setUsername] = useState("");
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	// const handleCreateUser = async () => {
	// 	const response = await createUser({ username, email, password });
	// 	console.log("response", response);
	// 	if (!(response instanceof Array)) {
	// 		setUsername("");
	// 		setEmail("");
	// 		setPassword("");
	// 	}
	// };

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create an Account</CardTitle>
				<CardDescription>Sign up to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="username" {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => {
								// console.log("field", field);
								return (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="password" type="password" {...field} />
										</FormControl>
										<FormDescription>This is your public display name.</FormDescription>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email" {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Next</Button>
					</form>
				</Form>
			</CardContent>
			{/* <CardFooter></CardFooter> */}
			{/* <form action={handleCreateUser}>
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
			</form> */}
		</Card>
	);
};

export default SignupCard;
