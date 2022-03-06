import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./actions/counterSlice";
import userReducer from "./actions/userSlice";
import productsReducer from "./actions/productsSlice";
import constantsSlice from "./actions/constantsSlice";
import userProductsSlice from "./actions/userProductsSlice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		userProducts: userProductsSlice,
		products: productsReducer,
		constants: constantsSlice,
	},
});
