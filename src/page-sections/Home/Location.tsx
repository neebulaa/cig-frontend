import { useAppData } from "@/AppProvider";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";
import CompanyType from "@/types/CompanyType";
import IconCopy from "./../../assets/icons/IconCopy";
import SlideVertical from "@/components/SlideVertical";

export default function Location() {
	const [company, setCompany] = useState<CompanyType>({} as CompanyType);
	const {
		main: { location },
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "my_company");
		if (data.status == 200) {
			setCompany(data.data.company);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<section className="section-seperator main-section" id="location">
			<section className="container">
				<header className="section-header">
					<SlideVertical>
						<h4 className="section-header-title">
							{location.title}
						</h4>
						<h2 className="section-header-tagline">
							{location.tagline}
						</h2>
					</SlideVertical>
				</header>

				<SlideVertical order={2}>
					<section className="location-content">
						<p className="location-label">{company.address}</p>
						<button className="btn location-copy">
							<IconCopy width={"24"} height={"24"} />
							Copy Address
						</button>
					</section>
				</SlideVertical>

				<SlideVertical order={3}>
					<section className="location-map">
						<iframe
							title={`Map of ${company.name}`}
							src={company.iframe_src}
							style={{ border: 0 }}
							loading="lazy"
						></iframe>
					</section>
				</SlideVertical>
			</section>
		</section>
	);
}
