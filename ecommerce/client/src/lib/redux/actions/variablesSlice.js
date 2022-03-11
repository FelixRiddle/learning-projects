import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		// products: {
		// 	products: [],
		// },
	},
	reducers: {
		insertProducts: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
		updateProducts: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
	},
});

export const { insertProducts, updateProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default productsSlice.reducer;
