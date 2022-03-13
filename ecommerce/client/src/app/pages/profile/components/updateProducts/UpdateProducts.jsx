import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserProducts } from "../../../../../lib/products/useUserProducts";

import RowView from "../../../../components/showcase/row_view/row_view/RowView";

function UpdateProducts() {
	const user = useSelector((state) => state.user);
	useUserProducts(user._id);
	const userProducts = useSelector((state) => state.userProducts);

	useEffect(() => {
		console.log(`User products:`, userProducts);
	}, [userProducts]);

	return (
		<div>
			<p style={{ margin: 0 }}>
				<b>Edit products</b>
			</p>
			<RowView items={userProducts} infiniteScroll={true} />
		</div>
	);
}

export default UpdateProducts;
