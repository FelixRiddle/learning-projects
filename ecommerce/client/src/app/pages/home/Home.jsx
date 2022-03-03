import { useContext } from "react";

import { GlobalContext } from "../../App";
import DefaultPanelView from "../../components/showcase/default_panel/default_panel_view/DefaultPanelView";
import "./Home.css";

const Home = () => {
	const { products } = useContext(GlobalContext);

	return (
		<div>
			<h2>Home</h2>
			<DefaultPanelView items={products} />
		</div>
	);
};

export default Home;
