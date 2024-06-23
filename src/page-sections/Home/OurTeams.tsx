import { useAppData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import TeamMemberType from "@/types/TeamMemberType";
import fetching from "@/utils/fetching";
import { CSSProperties, useEffect, useState } from "react";

const TOTAL_MEMBERS_PER_SLIDE = 4;

export default function Products() {
	const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlide, setTotalSlide] = useState(0);
	const {
		main: { our_team },
	} = useAppData();

	async function getData() {
		const data = await fetching("get", "team_members");
		const products = data.data.team_members;
		setTeamMembers(products);
		setTotalSlide(() => {
			return Math.ceil(products.length / TOTAL_MEMBERS_PER_SLIDE);
		});
	}

	useEffect(() => {
		getData();
	}, []);
	return (
		<section className="section-seperator main-section" id="our-team">
			<section className="container">
				<header className="section-header">
					<h4 className="section-header-title">{our_team.title}</h4>
					<h2 className="section-header-tagline">
						{our_team.tagline}
					</h2>
				</header>
				<section
					className="member-cards"
					style={
						{
							"--slide": currentSlide - 1,
						} as CSSProperties
					}
				>
					<section className="member-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section key={i} className="member-card-row">
								{teamMembers
									.slice(
										i * TOTAL_MEMBERS_PER_SLIDE,
										i * TOTAL_MEMBERS_PER_SLIDE +
											TOTAL_MEMBERS_PER_SLIDE
									)
									.map((member) => (
										<article
											className="member-card"
											key={member.id}
										>
											<section className="member-card-profile">
												<img
													src={
														member.public_profile_image
													}
													alt={`Member Profile Image - ${member.name}`}
												/>
											</section>
											<section className="member-card-about">
												<h3>{member.name}</h3>
												<p>{member.bio}</p>
											</section>
										</article>
									))}
							</section>
						))}
					</section>
				</section>
				<section className="mt-1">
					<ArrowPagination
						totalPage={totalSlide}
						currentPage={currentSlide}
						setPage={(page) => setCurrentSlide(page)}
					/>
				</section>
			</section>
		</section>
	);
}
