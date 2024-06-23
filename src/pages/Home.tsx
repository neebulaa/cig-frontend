import { useAppData } from "@/AppProvider";
import About from "@/page-sections/Home/About";
import Hero from "@/page-sections/Home/Hero";
import Pinpoints from "@/page-sections/Home/Pinpoints";
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
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
