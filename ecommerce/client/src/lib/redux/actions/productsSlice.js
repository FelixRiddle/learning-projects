import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: {
			id: "",
			products: [],
		},
	},
	reducers: {
		insertProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { insertProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default productsSlice.reducer;
