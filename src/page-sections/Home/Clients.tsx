import { useAppData } from "@/AppProvider";
import ClientType from "@/types/ClientType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SlideVertical from "@/components/SlideVertical";
import SlideHorizontal from "@/components/SlideHorizontal";

export default function Clients() {
	const [clients, setClients] = useState<ClientType[]>([]);
	const {
		main: { our_client },
		windowSize,
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
					<SlideVertical>
						<h4 className="section-header-title">
							{our_client.title}
						</h4>
						<h2 className="section-header-tagline">
							{our_client.tagline}
						</h2>
					</SlideVertical>
				</header>

				<section className="client-sliders-watcher">
					<SlideHorizontal
						toDirection="left"
						order={2}
						triggerBySelf={!(windowSize <= 768)}
					>
						<section className="client-sliders">
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												effect="blur"
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h5 className="client-name">
											{client.name}
										</h5>
									</article>
								))}
							</section>
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												effect="blur"
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h5 className="client-name">
											{client.name}
										</h5>
									</article>
								))}
							</section>
						</section>
					</SlideHorizontal>
					<section className="client-sliders mt-1">
						<SlideHorizontal
							toDirection="right"
							order={2}
							triggerBySelf={!(windowSize <= 768)}
						>
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												effect="blur"
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h5 className="client-name">
											{client.name}
										</h5>
									</article>
								))}
							</section>
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												effect="blur"
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h5 className="client-name">
											{client.name}
										</h5>
									</article>
								))}
							</section>
						</SlideHorizontal>
					</section>
				</section>
			</section>
		</section>
	);
}
