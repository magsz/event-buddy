import "./globals.css";
import Link from "next/link";
import LogoutButton from "./logout.js";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<nav className="p-4">
					<div className="navLinkContainer">
						<Link className="navLink" href="/">
							Home
						</Link>

						<Link className="navLink" href="/events">
							Events
						</Link>

						<Link className="navLink" href="/login">
							Log In
						</Link>
						<LogoutButton></LogoutButton>
					</div>
				</nav>
				{children}
			</body>
		</html>
	);
}
