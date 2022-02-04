import { BrowserRouter, Route, Routes as Routes1 } from "react-router-dom";

import Home from "../../../../pages/home/Home";
import About from "../../../../pages/about/About";
import Login from "../../../../pages/login/Login";
import Register from "../../../../pages/register/Register";
import Search from "../../../../pages/search/Search";
import Profile from "../../../../pages/profile/Profile";
import CreateProduct from "../../../../pages/createProduct/CreateProduct";

const Routes = (props) => {
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
			</Routes1>
		</BrowserRouter>
	);
};

export default Routes;
