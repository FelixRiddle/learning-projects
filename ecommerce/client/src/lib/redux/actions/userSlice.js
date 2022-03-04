import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		value: {},
	},
	reducers: {
		insertUser: (state, action) => {
			state = action.payload;
		},
		updateUser: (state, action) => {
			state = action.payload;
		},
	},
});

export const { insertUser, updateUser } = userSlice;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
