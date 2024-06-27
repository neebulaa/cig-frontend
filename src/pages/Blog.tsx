import { useAppData } from "@/AppProvider";
import Latest from "@/page-sections/Blog/Latest";
import Main from "@/page-sections/Blog/Main";
import TravelMore from "@/page-sections/Blog/TravelMore";
import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";

export default function Blog() {
	const [posts, setPosts] = useState<
		(PostType & { category: CategoryType })[]
	>([]);
	const data = useAppData();

	useEffect(() => {
		async function getData() {
			const response = await fetching("get", "articles?get=all");
			setPosts(response.data.posts);
		}

		getData();
	}, []);

	if (!data.articles) return null;

	return (
		<>
			{posts.length > 0 && (
				<>
					<Main post={posts[0]} />
					<Latest posts={posts.slice(0, 4)} />
					<TravelMore posts={posts} />
				</>
			)}
		</>
	);
}
