import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./actions/counterSlice";
import userReducer from "./actions/userSlice";
import productsReducer from "./actions/productsSlice";
import constantsSlice from "./actions/constantsSlice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		products: productsReducer,
		constants: constantsSlice,
	},
});
