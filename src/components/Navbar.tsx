import { useEffect, useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation } from "react-router-dom";
import SlideVertical from "./SlideVertical";
import CompanyType from "@/types/CompanyType";
import fetching from "@/utils/fetching";

export default function Navbar() {
	const [openNavbar, setOpenNavbar] = useState(false);
	const [company, setCompany] = useState<CompanyType>({} as CompanyType);
	const [runAnimation, setRunAnimation] = useState(true);
	const navRef = useRef<HTMLDivElement>(null);

	const { pathname, hash } = useLocation();
	const links = [
		{
			text: "Home",
			path: "/#",
			active: hash === "#",
		},
		{
			text: "About Us",
			path: "/#about",
			active: hash === "#about",
		},
		{
			text: "Products",
			path: "/products",
			active: pathname === "/products",
		},
		{
			text: "Commodities",
			path: "/#comodities",
			active: hash === "#comodities",
		},
		{
			text: "Clients",
			path: "/#clients",
			active: hash === "#clients",
		},
		{
			text: "Articles",
			path: "/articles",
			active: pathname === "/articles",
		},
		{
			text: "Certifications",
			path: "/#certifications",
			active: hash === "#certifications",
		},
	];

	async function getData() {
		const dataCompany = await fetching("get", "my_company");
		if (dataCompany.status === 200) {
			setCompany(dataCompany.data.company);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				navRef.current &&
				!navRef.current.contains(event.target as Node)
			) {
				if (openNavbar) {
					setOpenNavbar(false);
				}
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openNavbar]);

	return (
		<nav
			className="container"
			id="navbar"
			aria-description="A Navbar to navigate across pages"
			ref={navRef}
		>
			{Object.keys(company).length === 0 ? (
				""
			) : (
				<SlideVertical
					runAnimation={runAnimation}
					order={2}
					moveByProperty="positioning"
				>
					<div
						className="navbar-container"
						style={{ position: "relative" }}
					>
						<section className="navbar-logo">
							<LazyLoadImage
								src={company.public_logo}
								alt="CIG's Logo"
							/>
						</section>
						<ul
							className={`navbar-links ${
								openNavbar ? "open" : ""
							}`}
						>
							{links.map((link, i) => (
								<li key={i}>
									<a
										href={link.path}
										onClick={() => setRunAnimation(false)}
										className={link.active ? "active" : ""}
									>
										{link.text}
									</a>
								</li>
							))}
						</ul>
						<div
							className={`hamburger-menu ${
								openNavbar ? "open" : ""
							}`}
							onClick={() => {
								setOpenNavbar((prev) => !prev);
								setRunAnimation(false);
							}}
						>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</SlideVertical>
			)}
		</nav>
	);
}
