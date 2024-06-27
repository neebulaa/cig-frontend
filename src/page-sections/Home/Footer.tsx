import { useAppData } from "@/AppProvider";
import IconLocation from "@/assets/icons/IconLocation";
import IconPhone from "@/assets/icons/IconPhone";
import SlideVertical from "@/components/SlideVertical";
import CompanyType from "@/types/CompanyType";
import SocialType from "@/types/SocialType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";

export default function Footer() {
	const [company, setCompany] = useState<CompanyType>({} as CompanyType);
	const [socials, setSocials] = useState<SocialType[]>([]);
	const { windowSize } = useAppData();

	const links = [
		{
			text: "About Us",
			path: "/#about",
		},
		{
			text: "Our Visions",
			path: "/#visions",
		},
		{
			text: "Benefits",
			path: "/#benefits",
		},
		{
			text: "Our Clients",
			path: "/#clients",
		},
		{
			text: "Products",
			path: "/#products",
		},
		{
			text: "Articles",
			path: "/#articles",
		},
		{
			text: "Certifications",
			path: "/#certifications",
		},
		{
			text: "Location",
			path: "/#location",
		},
	];

	async function getData() {
		const dataCompany = await fetching("get", "my_company");
		const dataSocial = await fetching("get", "socials");
		if (dataCompany.status == 200) {
			setCompany(dataCompany.data.company);
		}

		if (dataSocial.status == 200) {
			setSocials(dataSocial.data.socials);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{Object.keys(company).length > 0 && (
				<section className="section-seperator main-section" id="footer">
					<section className="container">
						<SlideVertical>
							<section className="company-description">
								<section className="company-logo">
									<img
										src={company.public_logo}
										alt={`Company Logo -- ${company.name}`}
									/>
								</section>
								<h3 className="company-name">{company.name}</h3>
								<p className="company-about">{company.about}</p>

								<section className="company-socials">
									{socials.map((social) => (
										<a href={social.link} key={social.id}>
											<img
												src={social.public_icon}
												alt={`Social Icon - ${social.type}`}
											/>
										</a>
									))}
								</section>
							</section>
						</SlideVertical>

						<SlideVertical order={windowSize <= 768 ? 0 : 2}>
							<ul className="footer-part footer-menu">
								<h4>Menu</h4>
								{links.map((link, i) => (
									<li key={i}>
										<a href={link.path}>{link.text}</a>
									</li>
								))}
							</ul>
						</SlideVertical>
						<SlideVertical order={windowSize <= 768 ? 0 : 3}>
							<section className="footer-part company-info">
								<h4>Company Info</h4>
								<p className="company-address">
									<IconLocation width={"30"} height={"30"} />
									{company.address}
								</p>
								<p className="company-contact">
									<IconPhone width={"24"} height={"24"} />
									{company.phone}
								</p>
							</section>
						</SlideVertical>
					</section>
				</section>
			)}
		</>
	);
}
