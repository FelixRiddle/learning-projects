import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import { GlobalContext } from "../../App";
import DefaultPanelView from "../../components/showcase/default_panel/default_panel_view/DefaultPanelView";
import "./Home.css";
import { selectProducts } from "../../../lib/redux/actions/productsSlice";

const Home = () => {
	const { products } = useContext(GlobalContext);

	const selectedProducts = useSelector(selectProducts);

	useEffect(() => {
		console.log(`Products selected:`, selectedProducts);
	}, [selectedProducts]);

	return (
		<div>
			<h2>Home</h2>
			<DefaultPanelView items={products} />
		</div>
	);
};

export default Home;
