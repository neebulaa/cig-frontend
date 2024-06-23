import { useAppData } from "@/AppProvider";
import HeroImage1 from "@/assets/images/hero-image-1.png";
import HeroImage2 from "@/assets/images/hero-image-2.png";
import HeroImage3 from "@/assets/images/hero-image-3.png";
import { CSSProperties } from "react";
import AnimationFadeSequence from "@/components/AnimationFadeSequence";

export default function Hero() {
	const {
		main: { hero },
	} = useAppData();
	return (
		<>
			<section id="hero" className="main-section">
				<section className="container">
					<h1 className="hero-title">{hero.title}</h1>
					<section className="hero-image">
						<AnimationFadeSequence>
							<img
								src={HeroImage1}
								alt="Hero Image"
								style={
									{
										"--order": 1,
									} as CSSProperties
								}
							/>
							<img
								src={HeroImage2}
								alt="Hero Image"
								style={
									{
										"--order": 2,
									} as CSSProperties
								}
							/>
							<img
								src={HeroImage3}
								alt="Hero Image"
								style={
									{
										"--order": 3,
									} as CSSProperties
								}
							/>
						</AnimationFadeSequence>
					</section>
					<p className="hero-description">{hero.description}</p>
					<section className="hero-buttons">
						<a href={hero.left_button.link} className="btn">
							{hero.left_button.text}
						</a>
						<a
							href={hero.right_button.link}
							className="btn btn-empty"
						>
							{hero.right_button.text}
						</a>
					</section>
				</section>
				<section className="hero-slider">
					<section className="container">
						<div className="sliders">
							<div className="slider">
								{hero.slider.map((text: string, i: number) => (
									<p key={i}>{text}</p>
								))}
							</div>
							<div className="slider">
								{hero.slider.map((text: string, i: number) => (
									<p key={i}>{text}</p>
								))}
							</div>
						</div>
					</section>
				</section>
			</section>
		</>
	);
}
