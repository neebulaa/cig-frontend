import { useAppData } from "@/AppProvider";
import ComodityType from "@/types/ComodityType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";

export default function Comodities() {
	const [comodityData, setComodityData] = useState<ComodityType[]>([]);
	const {
		main: { comodity },
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "comodities");
		setComodityData(data.data.comodities);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<section className="section-seperator main-section" id="visions">
			<section className="container">
				<header className="section-header">
					<h4 className="section-header-title">{comodity.title}</h4>
					<h2 className="section-header-tagline">
						{comodity.tagline}
					</h2>
				</header>

				<section className="comodity-cards">
					{comodityData.map((comodity) => (
						<figure className="comodity-card" key={comodity.id}>
							<img
                                className="comodity-icon"
								src={comodity.public_icon}
								alt={`Comodity Icon - ${comodity.name}`}
							/>
							<figcaption className="comodity-name">{comodity.name}</figcaption>
						</figure>
					))}
				</section>
			</section>
		</section>
	);
}
