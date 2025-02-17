"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
	const router = useRouter();

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("userid");

		router.push("/login");
	}

	return (
		<button
			className="m-4 hover:text-purple-500 text-md"
			onClick={handleLogout}>
			Log Out
		</button>
	);
}
