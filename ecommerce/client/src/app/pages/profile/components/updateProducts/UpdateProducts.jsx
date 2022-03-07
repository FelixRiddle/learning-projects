import React from "react";
import { useSelector } from "react-redux";

import RowView from "../../../../components/showcase/row_view/row_view/RowView";

function UpdateProducts() {
	const userProducts = useSelector((state) => state.userProducts);
	console.log(`User products:`, userProducts);

	return (
		<div>
			<p style={{ margin: 0 }}>
				<b>Edit products</b>
			</p>
			<RowView items={userProducts} />
		</div>
	);
}

export default UpdateProducts;
