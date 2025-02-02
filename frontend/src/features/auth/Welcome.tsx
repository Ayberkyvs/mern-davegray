import { Link } from "react-router-dom";

const Welcome = () => {
	const date = new Date();
	const today = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
		timeStyle: "long",
	}).format(date); //? Intl.DateTimeFormat is a built-in object that enables language-sensitive date and time formatting.

	return (
		<section className="welcome">
			<p>{today}</p>
			<h1>Welcome!</h1>
			<p>
				<Link to="/dash/notes">View techNotes</Link>
			</p>
			<p>
				<Link to="/dash/users">View User Settings</Link>
			</p>
		</section>
	);
};
export default Welcome;
