import React, { useState } from "react";
import Image from "next/image";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// Handle the search term...
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center justify-center ">
			<div className="flex items-center space-x-2 w-40 px-4 py-2 bg-[#2c2e32] border border-[#383a3e] rounded-md text-sm leading-tight shadow">
				<Image src={"/search.png"} alt="" width={20} height={20} />
				<input
					type="text"
					value={searchTerm}
					onChange={handleChange}
					placeholder="Search"
					className="focus:outline-none focus:shadow-outline w-full h-full bg-transparent placeholder-mywhite"
				/>
			</div>
		</form>
	);
};

export default SearchBar;
