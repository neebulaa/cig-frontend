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

	async function getData() {
		const pageContent = await fetching("get", "page_contents");
		console.log(pageContent);
		setPageContent(pageContent.data.page_contents);
	}

	useEffect(() => {
		getData();
	}, []);
	return (
		<AppDataContext.Provider value={pageContent}>
			{children}
		</AppDataContext.Provider>
	);
}
