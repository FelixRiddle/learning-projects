import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./Footer.css";

const Footer = () => {
	const { scrollHeight } = useSelector((state) => state.variables);

	useEffect(() => {
		console.log(`Scroll height:`, scrollHeight);
	}, [scrollHeight]);

	return (
		<div style={{ position: "absolute", top: scrollHeight }}>
			{scrollHeight !== 0 && (
				<nav className="footer-navbar">
					<a id="footbar-item-1" href="/faq">
						Frequent asked questions
					</a>
					<a id="footbar-item-2" href="/tos">
						Terms of service
					</a>
					<a id="footbar-item-3" href="/data">
						Your data
					</a>
					<a id="footbar-item-4" href="/interestbasedads">
						Interest based ads
					</a>
					<a id="footbar-item-5" href="/license">
						&copy; 2022, Mercado
					</a>
				</nav>
			)}
		</div>
	);
};

export default Footer;
