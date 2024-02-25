import { getAllTrays } from "@/actions/queries";

const Home = async () => {
	const trays = await getAllTrays();

	return (
		<div className="flex-grow flex flex-col items-center">
			<div>
				Trays:
				{trays.map((tray) => (
					<div key={tray.id}>{tray.title}</div>
				))}
			</div>
			<div className="max-w-lg"></div>
		</div>
	);
};

export default Home;
