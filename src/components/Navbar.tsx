import Logo from "@/assets/images/logo.png";
import { useLocation } from "react-router-dom";

export default function Navbar() {
	const { pathname } = useLocation();
	const links = [
		{
			text: "Home",
			path: "/",
			active: false,
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
			text: "certifications",
			path: "/#certifications",
			active: false,
		},
		{
			text: "articles",
			path: "/articles",
			active: pathname == "/products",
		},
		{
			text: "products",
			path: "/products",
			active: pathname == "/products",
		},
	];
	return (
		<nav
			className="container"
			id="navbar"
			aria-description="A Navbar to navigate across pages"
		>
			<div className="navbar-container">
				<section className="navbar-logo">
					<img src={Logo} alt="CIG's Logo" />
				</section>
				<ul className="navbar-links">
					{links.map((link, i) => (
						<li key={i}>
							<a
								href={link.path}
								className={link.active ? "active" : ""}
							>
								{link.text}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
