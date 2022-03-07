import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import RowViewElement from "../row_view_element/RowViewElement";

function RowView(props) {
	const { items, title } = props;
	const { clientUrl } = useSelector((state) => state.constants);

	const handleClick = (props) => {
		console.log(`Clicked on image:`, props);
		const e = props;
		const url = `${clientUrl}app/${e._id}/${e.name.replaceAll(" ", "-")}`;
		window.open(url, "_blank").focus();
	};

	return (
		<div>
			<h1 className="title">
				<b>{title}</b>
			</h1>

			<nav>
				{items &&
					items[0] &&
					Object.entries(items).length >= 1 &&
					items.map((e, index) => {
						// console.log(`Item:`, e);
						return (
							<RowViewElement key={uuidv4()} {...e} clickFn={handleClick} />
						);
					})}
			</nav>
		</div>
	);
}

export default RowView;
