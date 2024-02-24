import { getAllTrays } from "@/actions/queries";
import Signup from "@/components/signup-card";

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
			<div className="max-w-lg">
				<Signup />
			</div>
		</div>
	);
};

export default Home;
