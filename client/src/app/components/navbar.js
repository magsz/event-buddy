'use client'
import LogoutButton from "../logout";
import Link from "next/link";
import { useContext } from "react";
import { MyContext } from "../context/ContextProvider";

export default function NavBar() {
	const { isLoggedIn, userName } = useContext(MyContext);

	return (
		<nav className="p-4">
			<div className="navLinkContainer">
				<Link className="navLink" href="/">
					Home
				</Link>

				<Link className="navLink" href="/events">
					Events
				</Link>

				{isLoggedIn ? (
					<span>Hi, {userName}</span>
				) : (
					<Link className="navLink" href="/login">
						Log In
					</Link>
				)}
				<LogoutButton></LogoutButton>
			</div>
		</nav>
	);
}
