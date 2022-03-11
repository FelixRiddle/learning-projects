import { createSlice } from "@reduxjs/toolkit";

export const constantsSlice = createSlice({
	name: "constants",
	initialState: {
		clientUrl: "http://localhost:3000/",
		clientUrls: [""],
		maxImages: 20,
		serverUrl: "http://localhost:3001/",
		serverUrls: [""],
	},
	reducers: {},
});

// export const { } = counterSlice.actions;
// export const selectConstants = (state) => state.counter.value;
export default constantsSlice.reducer;
