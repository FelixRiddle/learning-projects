import { useEffect, useState } from "react";

export const useUserData = () => {
	const [userData, setUserData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		age: "",
		password: "",
		phoneNumber: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	useEffect(() => {
		// console.log(`User data:`, userData);
	}, [userData]);

	return { userData, setUserData, handleChange };
};
