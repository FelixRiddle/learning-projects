import React from "react";
import { Route, Routes } from "react-router-dom";

import ChangeAddress from "../change_address/ChangeAddress";
import ChangeBasicInfo from "../change_basic_info/ChangeBasicInfo";
import ChangePassword from "../change_password/ChangePasswords";

function ProfileRoutes(props) {
	return (
		<div>
			<Routes>
				<Route path="/" element={<ChangeBasicInfo {...props} />} />
				<Route
					path="/changeBasicInfo"
					element={<ChangeBasicInfo {...props} />}
				/>
				<Route path="/changePassword" element={<ChangePassword {...props} />} />
				<Route path="/changeAddress" element={<ChangeAddress {...props} />} />
			</Routes>
		</div>
	);
}

export default ProfileRoutes;
