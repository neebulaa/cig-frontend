import Logo from "@/assets/images/logo.png";
import { useLocation } from "react-router-dom";

export default function Navbar() {
	const { pathname } = useLocation();
	const links = [
		{
			text: "about",
			path: "/#about",
			active: false,
		},
		{
			text: "visions",
			path: "/#visions",
			active: false,
		},
		{
			text: "benefits",
			path: "/#benefits",
			active: false,
		},
		{
			text: "products",
			path: "/products",
			active: pathname == "/products",
		},
		{
			text: "comodities",
			path: "/#comodities",
			active: false,
		},
		{
			text: "clients",
			path: "/#clients",
			active: false,
		},
		{
			text: "articles",
			path: "/articles",
			active: pathname == "/products",
		},
		{
			text: "certifications",
			path: "/#certifications",
			active: false,
		},
		{
			text: "location",
			path: "/#location",
			active: false,
		},
	];
	return (
		<nav id="navbar" aria-description="A Navbar to navigate across pages">
			<section className="navbar-logo">
				<img src={Logo} alt="CIG's Logo" />
			</section>
			<ul className="navbar-links">
				{links.map((link) => (
					<li>
						<a
							href={link.path}
							className={link.active ? "active" : ""}
						>
							{link.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
