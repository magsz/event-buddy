import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<nav className="p-4">
					<div className="max-w-7xl mx-auto flex justify-end space-x-8">
						<Link
							className="m-4 hover:text-purple-500 text-md"
							href="/">
							Home
						</Link>

						<Link
							className="m-4 hover:text-purple-500 text-md"
							href="/events">
							Events
						</Link>

						<Link
							className="m-4 hover:text-purple-500 text-md"
							href="/login">
							Log In
						</Link>
					</div>
				</nav>
				{children}
			</body>
		</html>
	);
}
