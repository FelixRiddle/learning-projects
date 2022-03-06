import { createSlice } from "@reduxjs/toolkit";

export const userProductsSlice = createSlice({
	name: "userProducts",
	initialState: {
		value: [],
	},
	reducers: {
		insertUserProducts: (state, action) => {
			state.value = [...action.payload];
		},
		updateUserProducts: (state, action) => {
			// const { _id } = action.payload;
		},
	},
});

export const { insertUserProducts, updateUserProducts } =
	userProductsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default userProductsSlice.reducer;
