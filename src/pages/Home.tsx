import { useAppData } from "@/AppProvider";
import About from "@/page-sections/Home/About";
import Benefits from "@/page-sections/Home/Benefits";
import Clients from "@/page-sections/Home/Clients";
import Comodities from "@/page-sections/Home/Comodities";
import Hero from "@/page-sections/Home/Hero";
import OurTeams from "@/page-sections/Home/OurTeams";
import Pinpoints from "@/page-sections/Home/Pinpoints";
import Products from "@/page-sections/Home/Products";
import Visions from "@/page-sections/Home/Visions";

export default function Home() {
	const data = useAppData();
	if (!data.main) return <p>Getting data...</p>;
	console.log(data.main);
	return (
		<>
			<Hero />
			<Pinpoints />
			<About />
			<Visions />
			<Benefits />
			<Products />
			<Comodities />
			<OurTeams />
			<Clients />
		</>
	);
}
