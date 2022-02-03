import "./Footer.css";

const Footer = () => {
	return (
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
	);
};

export default Footer;
