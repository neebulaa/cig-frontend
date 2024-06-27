import { useAppData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import SlideVertical from "@/components/SlideVertical";
import ProductType from "@/types/ProductType";
import fetching from "@/utils/fetching";
import { CSSProperties, useEffect, useState } from "react";

let TOTAL_PRODUCTS_PER_SLIDE = 3;

export default function Products() {
	const [productsData, setProductsData] = useState<ProductType[]>([]);
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlide, setTotalSlide] = useState(0);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const {
		main: { products },
		windowSize,
	} = useAppData();

	if (windowSize <= 768) {
		TOTAL_PRODUCTS_PER_SLIDE = 2;
	}

	async function getData() {
		const data = await fetching("get", "products");
		const products = data.data.products;
		setProductsData(products);
		setTotalSlide(() => {
			return Math.ceil(products.length / TOTAL_PRODUCTS_PER_SLIDE);
		});
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<section className="section-seperator main-section" id="main-products">
			<section className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h4 className="section-header-title">
							{products.title}
						</h4>
						<h2 className="section-header-tagline">
							{products.tagline}
						</h2>
						<a href={products.button.link} className="btn mt-1">
							{products.button.text}
						</a>
					</SlideVertical>
				</header>
				<section
					className="main-product-cards"
					style={
						{
							"--slide": currentSlide - 1,
						} as CSSProperties
					}
				>
					<section className="main-product-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section key={i} className="main-product-card-row">
								<SlideVertical
									order={2}
									triggerBySelf={!(windowSize <= 768)}
								>
									{productsData
										.slice(
											i * TOTAL_PRODUCTS_PER_SLIDE,
											i * TOTAL_PRODUCTS_PER_SLIDE +
												TOTAL_PRODUCTS_PER_SLIDE
										)
										.map((product) => (
											<article
												className="main-product-card"
												key={product.id}
												style={
													{
														"--backgroundImage": `url(${product.public_image})`,
													} as CSSProperties
												}
											>
												<h3>{product.name}</h3>
												<p>{product.description}</p>
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
							setRunHeaderAnimation(false); // Ensure header animation does not re-run
						}}
					/>
				</section>
			</section>
		</section>
	);
}
