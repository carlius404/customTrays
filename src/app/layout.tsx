import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import "./globals.css";

export const metadata = {
	title: "Custom Trays",
	description: "",
};

import { Roboto } from "next/font/google";
import Sidebar from "../components/sidebar";

const robotos = Roboto({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={robotos.className}>
			<body className="flex flex-col h-screen overflow-y-hidden">
				<div className="flex-none">
					<Navbar />
				</div>
				<main className="grid grid-cols-[1fr,5fr] flex-grow">
					<Sidebar />
					{children}
				</main>
			</body>
		</html>
	);
}