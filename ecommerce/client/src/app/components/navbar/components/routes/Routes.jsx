import { BrowserRouter, Route, Routes as Routes1 } from "react-router-dom";

import Home from "../../../../pages/home/Home";
import About from "../../../../pages/about/About";
import Login from "../../../../pages/login/Login";
import Register from "../../../../pages/register/Register";
import Search from "../../../../pages/search/Search";
import Profile from "../../../../pages/profile/Profile";
import CreateProduct from "../../../../pages/createProduct/CreateProduct";
import ProductView from "../../../../pages/product_view/ProductView";
import Test from "../../../../pages/test/Test";
import ConfirmEmail from "../../../../pages/confirm_email/ConfirmEmail";

const Routes = (props) => {

	return (
		<BrowserRouter>
			<Routes1>
				{/* Navbar */}
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login user={props.user} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/search" element={<Search />} />

				{/* Products */}
				<Route path="/app/:userId/:productId/:name" element={<ProductView />} />
				<Route path="/createProduct" element={<CreateProduct />} />

				{/* Profile */}
				<Route
					path="/profile/*"
					element={<Profile />}
				/>
				<Route path="/confirmEmail/:id" element={<ConfirmEmail />} />

				{/* Other */}
				<Route path="/test" element={<Test />} />
				<Route path="*" element={<h1>404: Page not found.</h1>} />
			</Routes1>
		</BrowserRouter>
	);
};

export default Routes;
