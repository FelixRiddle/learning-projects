import { createSlice } from "@reduxjs/toolkit";

export const userProductsSlice = createSlice({
	name: "userProducts",
	initialState: {},
	reducers: {
		insertUserProducts: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
		updateUserProducts: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
	},
});

export const { insertUserProducts, updateUserProducts } =
	userProductsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default userProductsSlice.reducer;
