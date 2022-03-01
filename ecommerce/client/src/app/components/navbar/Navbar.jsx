import "./Navbar.css";
import React, { useState, useEffect } from "react";

import Links from "./components/links/Links";
import Footer from "./components/footer/Footer";
import Routes from "./components/routes/Routes";
import { useMasterCardGateway } from "../../../lib/payment/gateway/useMastercardGateway";

function Navbar() {
	const [reRender, setReRender] = useState(false);
	const [token, setToken] = useState("");

	useEffect(() => {
		console.log(`Triggering re render.`);
		if (reRender) setReRender(false);
	}, [reRender]);
	
	useMasterCardGateway();

	return (
		<div className="rootnavbar">
			{/* Links */}
			<div className="links">
				<Links></Links>
			</div>

			{/* Go to routes */}
			<Routes setReRender={setReRender} token={token} setToken={setToken} />

			{/* Footer */}
			<Footer></Footer>
		</div>
	);
}

export default Navbar;
