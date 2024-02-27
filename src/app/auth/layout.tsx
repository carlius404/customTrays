import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="min-h-screen grid grid-cols-[2fr,3fr] items-center">
			<section className="min-h-full dark:border-r flex justify-center items-center dark:bg-primary-foreground">
				<p>TODO: image</p>
			</section>
			<section className="lg:p-8">
				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"absolute right-4 top-4 md:right-8 md:top-8 px-2"
					)}
				>
					<Icons.home className="size-6" />
				</Link>
				<Card className="py-10 px-16 mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg">
					{children}
				</Card>
			</section>
		</main>
	);
};

export default AuthLayout;
