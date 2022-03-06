import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: {
			products: [],
		},
	},
	reducers: {
		insertProducts: (state, action) => {
			state.products = action.payload;
		},
		updateProducts: (state, action) => {
		},
	},
});

export const { insertProducts, updateProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default productsSlice.reducer;
