import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import DefaultPanelProduct from "../default_panel_product/DefaultPanelProduct";
import "./DefaultPanelView.css";

function DefaultPanelView(props) {
	const { items } = props;

	const [itemSize] = useState({
		width: 200,
		height: 200,
	});

	const handleItemClick = (e) => {
		const url = `http://localhost:3000/app/${e._id}/${e.name.replaceAll(
			" ",
			"-"
		)}`;
		// window.location.href = url;
		window.open(url, "_blank").focus();
	};

	return (
		<div className="DefaultPanelView">
			<p>DefaultPanelView</p>
			<div className="items">
				{items &&
					items[0] &&
					typeof items[0] === "object" &&
					Object.entries(items[0]).length >= 1 &&
					items.map((e, index) => {
						const id = uuidv4();
						return (
							<DefaultPanelProduct
								description={e.description}
								id={id}
								key={id}
								image={`http://localhost:3001/${e.images[0]}`}
								price={e.price}
								title={e.name}
								size={itemSize}
								clickFn={() => handleItemClick(e)}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default DefaultPanelView;
