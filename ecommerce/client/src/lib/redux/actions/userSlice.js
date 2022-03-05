import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
	},
	reducers: {
		insertUser: (state, action) => {
			state.user = action.payload;
		},
		updateUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { insertUser, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
