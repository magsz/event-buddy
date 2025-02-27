"use client";
import "./globals.css";

import { useRouter } from "next/navigation";
import { MyContext } from "./context/ContextProvider";
import { useContext } from "react";

export default function LogoutButton() {
	const { updateLogOut, updateUserName } = useContext(MyContext);
	const router = useRouter();

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("userid");
		updateLogOut(false);
		updateUserName("");

		router.push("/login");
	}

	return (
		<button className="navLink" onClick={handleLogout}>
			Log Out
		</button>
	);
}
