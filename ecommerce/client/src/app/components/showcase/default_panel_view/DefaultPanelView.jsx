import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import DefaultPanelProduct from "../default_panel_product/DefaultPanelProduct";
import "./DefaultPanelView.css";

function DefaultPanelView(props) {
	const { items } = props;

	const [panelSize, setPanelSize] = useState({
		width: "200px",
		height: "200px",
	});

	return (
		<div className="DefaultPanelView">
			<p>DefaultPanelView</p>
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
							image={e.images[0]}
							price={e.price}
							title={e.title}
						/>
					);
				})}
		</div>
	);
}

export default DefaultPanelView;
