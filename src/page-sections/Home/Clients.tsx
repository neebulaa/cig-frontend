import { useAppData } from "@/AppProvider";
import ClientType from "@/types/ClientType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";

export default function Clients() {
	const [clients, setClients] = useState<ClientType[]>([]);
	const {
		main: { our_client },
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "clients");
		setClients(data.data.clients);
	}

	useEffect(() => {
		getData();
	}, []);
	return (
		<section className="section-seperator main-section" id="clients">
			<section className="container">
				<header className="section-header">
					<h4 className="section-header-title">{our_client.title}</h4>
					<h2 className="section-header-tagline">
						{our_client.tagline}
					</h2>
				</header>

				<section className="client-sliders-watcher">
					<section className="client-sliders">
						<section className="client-slider">
							{clients.map((client) => (
								<article className="client-card">
									<img
										className="client-logo"
										src={client.public_logo}
										alt={`Client Logo - ${client.name}`}
									/>
									<h5 className="client-name">
										{client.name}
									</h5>
								</article>
							))}
						</section>
						<section className="client-slider">
							{clients.map((client) => (
								<article className="client-card">
									<img
										className="client-logo"
										src={client.public_logo}
										alt={`Client Logo - ${client.name}`}
									/>
									<h5 className="client-name">
										{client.name}
									</h5>
								</article>
							))}
						</section>
					</section>
					<section className="client-sliders mt-1">
						<section className="client-slider">
							{clients.map((client) => (
								<article className="client-card">
									<img
										className="client-logo"
										src={client.public_logo}
										alt={`Client Logo - ${client.name}`}
									/>
									<h5 className="client-name">
										{client.name}
									</h5>
								</article>
							))}
						</section>
						<section className="client-slider">
							{clients.map((client) => (
								<article className="client-card">
									<img
										className="client-logo"
										src={client.public_logo}
										alt={`Client Logo - ${client.name}`}
									/>
									<h5 className="client-name">
										{client.name}
									</h5>
								</article>
							))}
						</section>
					</section>
				</section>
			</section>
		</section>
	);
}
