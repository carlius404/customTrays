import "tailwindcss/tailwind.css";

export const metadata = {
	title: "Custom Trays",
	description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}