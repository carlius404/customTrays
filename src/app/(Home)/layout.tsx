import Navbar from "@/components/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="min-h-screen flex flex-col">
			<section className="flex-grow-0">
				<Navbar />
			</section>
			<section className="flex-1 flex">{children}</section>
		</main>
	);
};

export default HomeLayout;
