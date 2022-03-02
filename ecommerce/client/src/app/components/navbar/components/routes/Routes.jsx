import { BrowserRouter, Route, Routes as Routes1 } from "react-router-dom";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Home from "../../../../pages/home/Home";
import About from "../../../../pages/about/About";
import Login from "../../../../pages/login/Login";
import Register from "../../../../pages/register/Register";
import Search from "../../../../pages/search/Search";
import Profile from "../../../../pages/profile/Profile";
import CreateProduct from "../../../../pages/createProduct/CreateProduct";
import { GlobalContext } from "../../../../App";
import ProductView from "../../../../pages/product_view/ProductView";

const Routes = (props) => {
	const { products } = useContext(GlobalContext);

	return (
		<BrowserRouter>
			<Routes1>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login user={props.user} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/search" element={<Search />} />
				<Route
					path="/profile"
					element={<Profile setReRender={props.setReRender} />}
				/>
				<Route path="/createProduct" element={<CreateProduct />} />
				{products.map((e) => {
					// console.log(`Product:`, e);
					const productUrl = `app/${e._id}/${e.name.replaceAll(" ", "-")}`;
					return (
						<Route
							key={uuidv4()}
							path={productUrl}
							element={<ProductView {...e} />}
						/>
					);
				})}

				<Route path="*" element={<h1>404: Page not found.</h1>} />
			</Routes1>
		</BrowserRouter>
	);
};

export default Routes;
