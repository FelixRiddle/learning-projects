import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		value: {},
	},
	reducers: {
		insertProducts: (state, action) => {
			state = action.payload;
		},
	},
});

export const { insertProducts } = productsSlice;
export const selectProducts = (state) => state;
export default productsSlice.reducer;
