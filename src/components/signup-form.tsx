"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signupSchema } from "@/shemas";
import { useState, useTransition } from "react";
import { createUser } from "@/actions/mutations";
import FormError from "./form-error";
import FormSuccess from "./form-success";

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof signupSchema>) {
		setError(undefined);
		setSuccess(undefined);
		startTransition(() => {
			console.log("values", values);
			createUser(values).then((data) => {
				setError(data.error?.message);
				setSuccess(data.user ? "Confirmation email sent!" : undefined);
			});
			// send email verification link
		});
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-4">
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												label="Username"
												id="username"
												type="text"
												autoCapitalize="none"
												autoCorrect="off"
												disabled={isPending}
												aria-invalid={!!form.formState.errors.username}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												label="Password"
												id="password"
												type="password"
												autoCapitalize="none"
												autoCorrect="off"
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												label="Email"
												id="email"
												type="text"
												autoCapitalize="none"
												autoComplete="email"
												autoCorrect="off"
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button disabled={isPending} type="submit">
							{isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
							Sign Up
						</Button>
					</div>
				</form>
			</Form>
			<div className="text-sm inline-block text-muted-foreground">
				<span>Already have an account? </span>
				<Link
					href="/auth/login"
					className={`text-muted-foreground underline ${isPending && `cursor-default`}`}
				>
					Log In
				</Link>
			</div>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<div className="flex flex-col space-y-2">
				<Button variant="outline" type="button" disabled={isPending}>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button variant="outline" type="button" disabled={isPending}>
					<Icons.gitHub className="mr-2 h-4 w-4" />
					GitHub
				</Button>
			</div>
		</div>
	);
}
