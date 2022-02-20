import { useState, useEffect } from "react";
import { getAll } from "../../../lib/products/getProducts";

import DefaultPanelView from "../../components/showcase/default_panel_view/DefaultPanelView";
import "./Home.css";

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getAll("http://localhost:3001/api/products/getAll").then((data) => {
			setProducts([...data]);
		});
	}, []);

	return (
		<div>
			<h2>Home</h2>
			<DefaultPanelView items={products} />
		</div>
	);
};

export default Home;
