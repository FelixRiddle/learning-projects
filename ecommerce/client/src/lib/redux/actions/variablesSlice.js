import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		scrollHeight: 0,
	},
	reducers: {
		insertVariables: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
		updateVariables: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
	},
});

export const { insertVariables, updateVariables } = productsSlice.actions;
export const selectProducts = (state) => state.products.value;
export default productsSlice.reducer;
