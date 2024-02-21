"use client";
import Image from "next/image";
import React from "react";
import SearchBar from "./searchbar";
import Link from "next/link";
import "../app/globals.css";

const Navbar = () => {
	return (
		<nav className="w-full flex justify-center py-4 px-10 text-sm border-b-[0.15rem] border-[#383a3e]">
			<div className="w-full flex justify-between">
				<ul id="left" className="flex items-center space-x-8">
					{/* logo */}
					<li className="border-[#383a3e] border w-10 h-10">
						<Link href="/">
							<span className="block h-full w-full" />
						</Link>
					</li>
					<li>
						<Link href="/create">
							<div className="py-2 px-4 border border-[#383a3e] rounded-md bg-[#2c2e32] flex items-center space-x-1 hover:bg-[#313438]">
								<Image src={"/plus.png"} alt="" width={20} height={20} />
								<span>Create</span>
							</div>
						</Link>
					</li>
					<li>
						<Link href="explore" className="underline-transition">
							Explore
						</Link>
					</li>
					<li>
						<Link href="saved" className="underline-transition">
							Saved
						</Link>
					</li>
				</ul>
				<ul id="right" className="flex items-center space-x-4">
					<li>
						<SearchBar />
					</li>
					<Link href="/" className="border-[#383a3e] border w-10 h-10 cursor-pointer"></Link>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
