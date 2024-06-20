import { useAppData } from "@/AppProvider";
import About from "@/page-sections/Home/About";
import Hero from "@/page-sections/Home/Hero";
import Pinpoints from "@/page-sections/Home/Pinpoints";

export default function Home() {
	const data = useAppData();
	if (!data.main) return <p>Getting data...</p>;
	console.log(data.main);
	return (
		<>
			<Hero />
			<Pinpoints />
			<About />
		</>
	);
}
