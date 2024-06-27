import { useAppData } from "@/AppProvider";
import MapImage from "@/assets/images/map-white.png";
import fetching from "@/utils/fetching";
import { CSSProperties, Fragment, useEffect, useRef, useState } from "react";
import PinpointType from "@/types/PinpointType";
import PinpointProvince from "@/assets/images/province-pin.png";
import PinpointHarbor from "@/assets/images/harbor-pin.png";
import ComodityType from "@/types/ComodityType";
import ShipImage from "@/assets/images/ship.png";
import AnimationFadeSequence from "@/components/AnimationFadeSequence";
import SlideVertical from "@/components/SlideVertical";
import FadeIn from "@/components/FadeIn";

export default function Hero() {
	const [runAnimation, setRunAnimation] = useState(true);
	const [pinpointsData, setPinpointsData] = useState<PinpointType[]>([]);
	const [provinceImageDimensions, setProvinceImageDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [harborImageDimensions, setHarborImageDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [mapDimensions, setMapDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [visibleDescriptions, setVisibleDescriptions] = useState<
		Record<number, boolean>
	>({});

	const provinceImgRef = useRef<HTMLImageElement>(null);
	const harborImgRef = useRef<HTMLImageElement>(null);
	const mapImgRef = useRef<HTMLImageElement>(null);

	const {
		main: { pinpoints },
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "pinpoints");
		setPinpointsData(data.data.pinpoints);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (provinceImgRef.current) {
			const provinceRect = provinceImgRef.current.getBoundingClientRect();
			setProvinceImageDimensions({
				width: provinceRect.width,
				height: provinceRect.height,
			});
		}

		if (harborImgRef.current) {
			const harborRect = harborImgRef.current.getBoundingClientRect();
			setHarborImageDimensions({
				width: harborRect.width,
				height: harborRect.height,
			});
		}

		if (mapImgRef.current) {
			const mapRect = mapImgRef.current.getBoundingClientRect();
			setMapDimensions({
				width: mapRect.width,
				height: mapRect.height,
			});
		}
	}, [pinpointsData]);

	const toggleDescriptionVisibility = (index: number) => {
		setVisibleDescriptions((prev) => ({ ...prev, [index]: !prev[index] }));
		setRunAnimation(false);
	};

	return (
		<section id="pinpoints" className="main-section">
			<section className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runAnimation}>
						<h4 className="section-header-title">
							{pinpoints.title}
						</h4>
						<h2 className="section-header-tagline">
							{pinpoints.tagline}
						</h2>
					</SlideVertical>
				</header>
				<FadeIn order={2} runAnimation={runAnimation}>
					<section className="pinpoints-map">
						{/* Hidden images to get dimensions */}
						<img
							ref={provinceImgRef}
							src={PinpointProvince}
							alt="Pinpoint Province"
							style={{
								position: "absolute",
								visibility: "hidden",
							}}
						/>
						<img
							ref={harborImgRef}
							src={PinpointHarbor}
							alt="Pinpoint Harbor"
							style={{
								position: "absolute",
								visibility: "hidden",
							}}
						/>
						<img
							ref={mapImgRef}
							src={MapImage}
							alt="Indonesia Map"
							className="map-image"
							style={{
								position: "absolute",
								visibility: "hidden",
							}}
						/>

						{pinpointsData.map(
							(pinpoint: PinpointType, i: number) => {
								const isProvince =
									pinpoint.region.type === "province";
								const { width, height } = isProvince
									? provinceImageDimensions
									: harborImageDimensions;

								return (
									<div
										key={i}
										className="pinpoint"
										style={
											{
												"--top": `${
													parseFloat(
														pinpoint.pos_y as string
													) -
													(height /
														mapDimensions.height) *
														100
												}`,
												"--left": `${
													parseFloat(
														pinpoint.pos_x as string
													) -
													(width /
														2 /
														mapDimensions.width) *
														100
												}`,
											} as CSSProperties
										}
									>
										<img
											className="pinpoint-image"
											src={
												isProvince
													? PinpointProvince
													: PinpointHarbor
											}
											alt="Pinpoint"
										/>

										{isProvince && (
											<div
												className="pinpoint-comodities"
												style={
													{
														"--total":
															pinpoint.region
																.comodities
																.length,
													} as CSSProperties
												}
											>
												<AnimationFadeSequence>
													{pinpoint.region.comodities.map(
														(
															comodity: ComodityType,
															order: number
														) => (
															<img
																key={order}
																src={
																	comodity.public_icon
																}
																alt={`Pinpoint comodity - ${comodity.name}`}
																style={
																	{
																		"--order":
																			order,
																	} as CSSProperties
																}
															/>
														)
													)}
												</AnimationFadeSequence>
											</div>
										)}

										<div
											className={`pinpoint-identifier identifier-${pinpoint.region.type}`}
										>
											{isProvince && (
												<>
													<h5 className="pinpoint-identifier-name">
														{pinpoint.region.name}
													</h5>
													<p className="pinpoint-identifier-comodity mt-05">
														To explore:{" "}
														{pinpoint.region.comodities.map(
															(
																comodity: ComodityType,
																i: number
															) => (
																<Fragment
																	key={i}
																>
																	<a href="">
																		<span className="pinpoint-identifier-comodity-inline">
																			<img
																				src={
																					comodity.public_icon
																				}
																				alt={`Pinpoint comodity - ${comodity.name}`}
																			/>
																			{
																				comodity.name
																			}{" "}
																		</span>
																	</a>
																	{i !=
																	pinpoint
																		.region
																		.comodities
																		.length -
																		1
																		? "|"
																		: ""}
																</Fragment>
															)
														)}
													</p>
													<p
														className="pinpoint-identifier-why mt-05"
														onClick={() =>
															toggleDescriptionVisibility(
																i
															)
														}
													>
														Why{" "}
														{pinpoint.region.name}?
													</p>
													{visibleDescriptions[i] && (
														<p className="pinpoint-identifier-description">
															{
																pinpoint.region
																	.description
															}
														</p>
													)}
												</>
											)}
											{!isProvince && (
												<>
													<img
														src={ShipImage}
														alt="Ship"
													/>
													<h5 className="pinpoint-identifier-name">
														{pinpoint.region.name}
													</h5>
												</>
											)}
										</div>
									</div>
								);
							}
						)}

						<img
							src={MapImage}
							alt="Indonesia Map"
							className="map-image"
						/>
					</section>
				</FadeIn>
			</section>
		</section>
	);
}
