import { useAppData } from "@/AppProvider";
import IconDownload from "@/assets/icons/IconDownload";
import ArrowPagination from "@/components/ArrowPagination";
import CertificationType from "@/types/CertificationType";
import fetching from "@/utils/fetching";
import { CSSProperties, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import SlideVertical from "@/components/SlideVertical";

let TOTAL_CERTIFICATION_PER_PAGE = 2;

export default function Certifications() {
	const [certifications, setCertifications] = useState<CertificationType[]>(
		[]
	);
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlide, setTotalSlide] = useState(0);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);

	const {
		main: { certification },
		windowSize,
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "certifications");
		setCertifications(data.data.certifications);
		setTotalSlide(() => {
			return Math.ceil(
				data.data.certifications.length / TOTAL_CERTIFICATION_PER_PAGE
			);
		});
	}

	async function downloadImage(path: string) {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/images/${path}`,
			{ responseType: "blob" }
		);
		saveAs(response.data, "image.png"); // Put your image URL here.
	}

	useEffect(() => {
		getData();
	}, []);
	return (
		<section className="section-seperator main-section" id="certifications">
			<section className="container">
				<SlideVertical runAnimation={runHeaderAnimation}>
					<header className="section-header">
						<h4 className="section-header-title">
							{certification.title}
						</h4>
						<h2 className="section-header-tagline">
							{certification.tagline}
						</h2>
					</header>
				</SlideVertical>
				<section
					className="certification-cards"
					style={
						{
							"--slide": currentSlide - 1,
						} as CSSProperties
					}
				>
					<section className="certification-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section key={i} className="certification-card-row">
								<SlideVertical
									order={2}
									triggerBySelf={!(windowSize <= 768)}
								>
									{certifications
										.slice(
											i * TOTAL_CERTIFICATION_PER_PAGE,
											i * TOTAL_CERTIFICATION_PER_PAGE +
												TOTAL_CERTIFICATION_PER_PAGE
										)
										.map((certification) => (
											<article
												className="certification-card"
												key={certification.id}
											>
												<section className="certification-card-image">
													<img
														src={
															certification.public_image
														}
														alt={`Certification Image - ${certification.title}`}
													/>
												</section>
												<section className="certification-card-content">
													<h3>
														{certification.title}
													</h3>
													<p>
														{certification.description.slice(
															0,
															100
														)}
														{certification
															.description
															.length < 100
															? ""
															: "..."}
													</p>

													<button
														className="certification-download"
														onClick={() =>
															downloadImage(
																certification.image
															)
														}
													>
														<IconDownload
															width={"24"}
															height={"24"}
														/>
													</button>
												</section>
											</article>
										))}
								</SlideVertical>
							</section>
						))}
					</section>
				</section>
				<section className="mt-1">
					<ArrowPagination
						totalPage={totalSlide}
						currentPage={currentSlide}
						setPage={(page) => {
							setCurrentSlide(page);
							setRunHeaderAnimation(false);
						}}
					/>
				</section>
			</section>
		</section>
	);
}
