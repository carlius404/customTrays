"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoginSchema } from "@/shemas";
import { z } from "zod";
import { useTransition } from "react";
import { login } from "@/actions/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import Socials from "@/components/auth/socials";
import { useSearchParams } from "next/navigation";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = React.useState<string | undefined>();
	const [success, setSuccess] = React.useState<string | undefined>();

	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with a different provider"
			: "";

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof LoginSchema>) {
		setError(undefined);
		setSuccess(undefined);
		startTransition(() => {
			login(values).then((data) => {
				setError(data?.error);
			});
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
							<Link
								href="/auth/forgot-password"
								className="text-muted-foreground text-sm underline"
							>
								Forgot Password?
							</Link>
						</div>
						<FormError message={error || urlError} />
						<FormSuccess message={success} />
						<Button disabled={isPending} type="submit" className="mt-2">
							{isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
							Log In
						</Button>
					</div>
				</form>
			</Form>
			<div className="text-sm block text-muted-foreground">
				<span>Don't have an account? </span>
				<Link
					href="/auth/signup"
					className={`text-muted-foreground underline ${isPending && "pointer-events-none"}`}
				>
					Sign Up
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
			<Socials isPending={isPending} />
		</div>
	);
}
