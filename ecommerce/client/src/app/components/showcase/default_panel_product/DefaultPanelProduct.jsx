import React from "react";

import "./DefaultPanelProduct.css";

function DefaultPanelProduct(props) {
	const { id } = props;

	return (
		<div id={id} className={"DefaultPanelProduct"}>
			<p>DefaultPanelProduct</p>
		</div>
	);
}

export default DefaultPanelProduct;
