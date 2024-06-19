import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import Catalog from "@/pages/Catalog";
import Navbar from "@/components/Navbar";
import AppProvider from "./AppProvider";

function App() {
	const [count, setCount] = useState(0);
	return (
		<AppProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/products" element={<Catalog />}></Route>
				<Route path="/articles" element={<Articles />}></Route>
				<Route path="*" element={<Navigate to="/" />}></Route>
			</Routes>
		</AppProvider>
	);
}

export default App;
