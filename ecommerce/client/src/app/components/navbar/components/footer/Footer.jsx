import { useState } from "react";
import "./Footer.css";

const Footer = () => {
	const [scrollHeight, setScrollHeight] = useState(document.body.scrollHeight);

	window.onload = () => {
		console.log(`Scroll height:`, document.body.scrollHeight);
		setScrollHeight(document.body.scrollHeight);
	};

	return (
		<div style={{ position: "absolute", top: scrollHeight }}>
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
		</div>
	);
};

export default Footer;
