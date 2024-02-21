import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
	return (
		<div className="border-r-2 border-[#383a3e] flex flex-col text-sm p-4">
			<div className="mx-auto">Your trays</div>
			<ul>
				<li className="py-1">Tray 1</li>
				<li className="py-1">Tray 2</li>
				<li className="py-1">Tray 3</li>
				<li className="w-max py-1 mx-auto">
					<Link href="/create">
						<div className="py-2 px-4 border border-[#383a3e] rounded-md bg-[#2c2e32] flex items-center space-x-1 hover:bg-[#313438]">
							<Image src={"/plus.png"} alt="" width={20} height={20} />
							<span>Create</span>
						</div>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
