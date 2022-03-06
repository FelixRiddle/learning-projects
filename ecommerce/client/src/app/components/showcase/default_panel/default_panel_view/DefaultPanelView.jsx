/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useViewportSize } from "../../../../../lib/viewport/useViewportSize";

import DefaultPanelProduct from "../default_panel_product/DefaultPanelProduct";
import "./DefaultPanelView.css";

function DefaultPanelView(props) {
	const { items, rows } = props;

	const { clientUrl, serverUrl } = useSelector((state) => state.constants);

	const [itemSize] = useState({
		width: 200,
		height: 200,
		marginRight: 10,
	});
	const [loaded, setLoaded] = useState(false);
	const [navId] = useState(uuidv4());
	const [visibleItems, setVisibleItems] = useState([]);
	const { viewportSize } = useViewportSize(true);

	const handleItemClick = (e) => {
		const url = `${clientUrl}app/${e._id}/${e.name.replaceAll(" ", "-")}`;
		window.open(url, "_blank").focus();
	};

	// Limit the amount of items being shown
	useEffect(() => {
		if (!items) return;
		const squeezedItems = Math.floor(
			viewportSize.width / (itemSize.width + itemSize.marginRight)
		);
		const totalItems = squeezedItems * rows;
		const itemsAdded = [];
		console.log(`Total items:`, totalItems);
		for (let i = 0; i < totalItems; i++) itemsAdded.push(items[i]);
		setVisibleItems(itemsAdded);
		console.log(`Items added:`, itemsAdded);
	}, [itemSize, items, loaded, rows, viewportSize]);

	// Check when the loaded
	window.addEventListener("load", () => setLoaded(true));

	return (
		<div className="DefaultPanelView">
			<p>DefaultPanelView</p>
			<nav className="items" id={navId}>
				{/* To prevent any kind of errors */}
				{visibleItems &&
					visibleItems[0] &&
					typeof visibleItems[0] === "object" &&
					Object.entries(visibleItems[0]).length >= 1 &&
					visibleItems.map((e, index) => {
						const id = uuidv4();
						if (!e || (!e && !e.name)) return;

						return (
							// Show a product
							<DefaultPanelProduct
								description={e.description}
								id={id}
								key={id}
								image={`${serverUrl}${e.images[0]}`}
								index={index}
								marginRight={itemSize.marginRight}
								price={e.price}
								title={e.name}
								size={itemSize}
								clickFn={() => handleItemClick(e)}
							/>
						);
					})}
			</nav>
		</div>
	);
}

export default DefaultPanelView;
