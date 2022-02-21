import React from "react";

function ProductView(props) {
	const { name } = props;

	return (
		<div>
			ProductView
			<p>Product name: {name}</p>
		</div>
	);
}

export default ProductView;
