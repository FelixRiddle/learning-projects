import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import RowViewElement from "../row_view_element/RowViewElement";

function RowView(props) {
	const { items, maxItems, title } = props;
	const { clientUrl } = useSelector((state) => state.constants);
	const [newItems, setNewItems] = useState([]);

	const handleClick = (props) => {
		console.log(`Clicked on image:`, props);
		const e = props;
		const url = `${clientUrl}app/${e._id}/${e.name.replaceAll(" ", "-")}`;
		window.open(url, "_blank").focus();
	};

	useEffect(() => {
		if (items) {
			const newItemsArray = [];
			for (let i in items) {
				i = parseInt(i);

				if (i < maxItems) {
					newItemsArray.push(items[i]);
				}
			}

			setNewItems(newItemsArray);
		}
	}, [items, maxItems]);

	return (
		<div>
			<h1 className="title">
				<b>{title}</b>
			</h1>

			<nav>
				{newItems &&
					newItems[0] &&
					Object.entries(newItems).length >= 1 &&
					newItems.map((e, index) => {
						return (
							<RowViewElement key={uuidv4()} {...e} clickFn={handleClick} />
						);
					})}
			</nav>
		</div>
	);
}

export default RowView;
