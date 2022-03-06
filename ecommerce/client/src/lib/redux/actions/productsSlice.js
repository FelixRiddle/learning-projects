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
			// const { _id, description, id, images, name } = action.payload;
			// console.log(`State:`, state);
			// const existingProduct = state.find((state) => state.id === id);
			// console.log(`Existing product:`, existingProduct);
			
		},
	},
});

export const { insertProducts, updateProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default productsSlice.reducer;
