import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		insertUser: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
		updateUser: (state, action) => {
			for (let key of Object.entries(action.payload)) {
				state[key[0]] = key[1];
			}
		},
	},
});

export const { insertUser, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
