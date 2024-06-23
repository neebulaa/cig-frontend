import { useAppData } from "@/AppProvider";
import VisionType from "@/types/VisionType";
import fetching from "@/utils/fetching";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Visions() {
	const [visions, setVisions] = useState<VisionType[]>([]);
	const {
		main: { our_vision: vision },
	} = useAppData();

	const visionImages = useRef<(HTMLImageElement | null)[]>([]);

	async function getData() {
		const data = await fetching("get", "visions");
		setVisions(data.data.visions);
	}

	useEffect(() => {
		if (visions.length === 0) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".vision-images",
				start: "top 50%",
				end: "center top",
				scrub: true,
			},
		});

		visionImages.current.forEach((image) => {
			if (image) {
				tl.fromTo(
					image,
					{ opacity: 0 },
					{ opacity: 1, duration: 1, ease: "power2.inOut" }
				).to(image, {
					opacity: 0,
					duration: 1,
					ease: "power2.inOut",
				});
			}
		});
	}, [visions]);

	useEffect(() => {
		getData();
	}, []);

	return (
		<section className="section-seperator main-section" id="visions">
			<section className="container">
				<header className="section-header section-header-left">
					<h4 className="section-header-title">{vision.title}</h4>
					<h2 className="section-header-tagline">{vision.tagline}</h2>
				</header>
				<section className="vision-split">
					<section className="vision-content">
						{visions.map((v: VisionType, i: number) => (
							<article className="vision-card" key={v.id}>
								<h5 className="vision-card-number">{i + 1}</h5>
								<h3 className="vision-card-title">{v.title}</h3>
								<p className="vision-card-description">
									{v.description}
								</p>
							</article>
						))}
					</section>
					<section className="vision-images">
						{visions.map((v, i) => (
							<figure className="vision-image" key={i}>
								<img
									src={v?.public_image}
									alt={`Vision Image - ${v?.title}`}
									ref={(el) => (visionImages.current[i] = el)}
								/>
							</figure>
						))}
					</section>
				</section>
			</section>
		</section>
	);
}
