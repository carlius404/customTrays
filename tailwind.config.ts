import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				mywhite: "#e6e6e6",
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
			textColor: ["placeholder"],
		},
	},
	plugins: [],
};
export default config;
