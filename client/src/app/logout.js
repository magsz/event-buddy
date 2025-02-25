"use client";
import "./globals.css";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
	const router = useRouter();

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("userid");

		router.push("/login");
	}

	return (
		<button className="navLink" onClick={handleLogout}>
			Log Out
		</button>
	);
}
