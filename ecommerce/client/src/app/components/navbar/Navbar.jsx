import "./Navbar.css";
import React, { useState } from "react";

import Links from "./components/links/Links";
import Footer from "./components/footer/Footer";
import Routes from "./components/routes/Routes";
import { useMasterCardGateway } from "../../../lib/payment/gateway/useMastercardGateway";

function Navbar() {
	const [token, setToken] = useState("");

	useMasterCardGateway();

	return (
		<div className="rootnavbar">
			{/* Links */}
			<div className="links">
				<Links></Links>
			</div>

			{/* Go to routes */}
			<Routes token={token} setToken={setToken} />

			{/* Footer */}
			<Footer></Footer>
		</div>
	);
}

export default Navbar;
