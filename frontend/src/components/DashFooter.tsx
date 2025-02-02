import { House } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const goHomeButton = (
		<button
			className="dash-footer__button icon-button"
			title="Home"
			onClick={() => navigate("/dash")}
			type="button"
		>
			<House />
		</button>
	);

	return (
		<footer className="dash-footer">
			{pathname !== "/dash" && goHomeButton}
			<p>Current User:</p>
			<p>Status:</p>
		</footer>
	);
};
export default DashFooter;
