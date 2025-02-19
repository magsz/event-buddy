"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
	const [loginSuccess, setLoginSuccess] = useState(false);

	const [userLogin, setUserLogin] = useState({
		email: "",
		password: "",
	});

	const router = useRouter();

	async function handleChange(e) {
		setUserLogin((prev) => ({
			...userLogin,
			[e.target.name]: e.target.value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:8000/users/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userLogin),
				}
			);

			if (!response.ok) {
				throw new Error(`Failed: ${response.statusText}`);
			}

			const data = await response.json();
			console.log("Login Successful:", data);

			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data.userId);

			if (response.ok) {
				router.push("/events");
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	function handleSignUpSubmit() {
		router.push("/sign-up");
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-purple-200 p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold text-center text-gray-900">
					Log In
				</h2>

				{/* Login Form */}
				<form
					method="POST"
					className="mt-6"
					onSubmit={handleSubmit}>
					{/* Email */}
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-medium">
							Email:
						</label>
						<input
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="User@email.com..."
							required
							className="text-black mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Password */}
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium">
							Password:
						</label>
						<input
							type="password"
							name="password"
							onChange={handleChange}
							placeholder="password..."
							required
							className="text-black mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Remember Me */}
					<div className="mb-4 flex items-center">
						<input
							type="checkbox"
							name="remember"
							className="mr-2"
						/>
						<label className="text-gray-700">
							Remember me
						</label>
					</div>

					{/* Login Button */}
					<button
						type="submit"
						className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-indigo-900 transition">
						Log In
					</button>
				</form>

				{/* Separator */}
				<div className="mt-6 text-center text-gray-600">Or</div>

				{/* Sign Up Button */}
				<button
					type="button"
					onClick={handleSignUpSubmit}
					className="mt-4 w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-gray-800 transition">
					Sign Up
				</button>
			</div>
		</div>
	);
}
