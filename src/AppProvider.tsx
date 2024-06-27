import React, { ReactNode, useContext, useEffect, useState } from "react";
import PageContentType from "@/types/PageContentType";
import fetching from "@/utils/fetching";
type AppProviderProps = {
	children: ReactNode;
};

export const AppDataContext = React.createContext({} as any);

export function useAppData() {
	return useContext(AppDataContext);
}

export default function AppProvider({ children }: AppProviderProps) {
	const [pageContent, setPageContent] = useState<PageContentType>(
		{} as PageContentType
	);
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	async function getData() {
		const pageContent = await fetching("get", "page_contents");
		setPageContent(pageContent.data.page_contents);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		function resize() {
			setWindowSize(window.innerWidth);
		}
		document.addEventListener("resize", resize);
		return () => document.removeEventListener("resize", resize);
	}, []);
	return (
		<AppDataContext.Provider value={{ ...pageContent, ...{ windowSize } }}>
			{children}
		</AppDataContext.Provider>
	);
}
