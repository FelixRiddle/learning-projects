import { useSelector } from "react-redux";

import DefaultPanelView from "../../components/showcase/default_panel/default_panel_view/DefaultPanelView";
import RowView from "../../components/showcase/row_view/row_view/RowView";
import "./Home.css";

const Home = () => {
	const products = useSelector((state) => state.products);

	return (
		<div>
			<h2>Home</h2>
			<DefaultPanelView items={products} rows={2} title={"Featured products"} />
			<RowView items={products} title={"Trending"} maxItems={5} />
		</div>
	);
};

export default Home;
