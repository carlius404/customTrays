import React from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata = {
	title: "Custom Trays",
	description: "",
};

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn("min-h-screen dark font-sans antialiased ", fontSans.variable)}>
				{children}
			</body>
		</html>
	);
}