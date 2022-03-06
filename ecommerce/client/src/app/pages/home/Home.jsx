import { useSelector } from "react-redux";

import DefaultPanelView from "../../components/showcase/default_panel/default_panel_view/DefaultPanelView";
import "./Home.css";

const Home = () => {
	const products = useSelector((state) => state.products.products.value);

	return (
		<div>
			<h2>Home</h2>
			<DefaultPanelView items={products} rows={2} />
		</div>
	);
};

export default Home;
