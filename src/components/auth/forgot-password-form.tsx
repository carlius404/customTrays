"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ForgotPasswordSchema } from "@/shemas";
import { z } from "zod";
import { useTransition } from "react";
import { forgotPassword } from "@/actions/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = React.useState<string | undefined>();
	const [success, setSuccess] = React.useState<string | undefined>();

	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
		setError(undefined);
		setSuccess(undefined);
		startTransition(() => {
			console.log("values", values);
			forgotPassword(values).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
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
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Link
							href="/auth/login"
							className={`text-sm block text-muted-foreground underline  ${
								isPending && "pointer-events-none"
							}`}
						>
							Back to login
						</Link>
						<Button disabled={isPending} type="submit" className="mt-2">
							{isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
							Send Email
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
