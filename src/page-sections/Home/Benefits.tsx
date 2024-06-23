import { useAppData } from "@/AppProvider";
import BenefitType from "@/types/BenefitType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";

export default function Benefits() {
	const [benefitsData, setBenefitsData] = useState<BenefitType[]>([]);
	const {
		main: { benefits },
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "benefits");
		setBenefitsData(data.data.benefits);
	}

	useEffect(() => {
		getData();
	}, []);
	return (
		<section className="section-seperator main-section" id="benefits">
			<section className="container">
				<header className="section-header">
					<h4 className="section-header-title">{benefits.title}</h4>
					<h2 className="section-header-tagline">
						{benefits.tagline}
					</h2>
				</header>

				<section className="benefit-cards">
					{benefitsData.map((benefit) => (
						<article className="benefit-card" key={benefit.id}>
							<img
                                className="benefit-icon"
								src={benefit.public_icon}
								alt={`Benefit Icon - ${benefit.title}`}
							/>
							<h3 className="benefit-title mt-1">{benefit.title}</h3>
							<p className="benefit-description">{benefit.description}</p>
						</article>
					))}
				</section>
			</section>
		</section>
	);
}
