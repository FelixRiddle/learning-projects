import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./actions/counterSlice";
import userReducer from "./actions/userSlice";
import productsReducer from "./actions/productsSlice";
import constantsReducer from "./actions/constantsSlice";
import userProductsReducer from "./actions/userProductsSlice";
import variablesReducer from "./actions/variablesSlice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		userProducts: userProductsReducer,
		products: productsReducer,
		constants: constantsReducer,
		variables: variablesReducer,
	},
});
