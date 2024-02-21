import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import "./globals.css";

export const metadata = {
	title: "Custom Trays",
	description: "",
};

import { Roboto } from "next/font/google";

const robotos = Roboto({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={robotos.className}>
			<body>
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
}