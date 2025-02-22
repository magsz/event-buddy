"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		console.log(formData);

		try {
			const response = await fetch(
				"http://localhost:8000/users/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();
			setMessage("Account Created Succesfully!");
			setFormData({
				username: "",
				email: "",
				password: "",
			});

			if (response.ok) {
				console.log("Account Created", data);
			}
		} catch (err) {
			setMessage("Erro:" + err.message);
		} finally {
			setLoading(false);
			router.push("/login");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-purple-200 p-8  rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold text-center text-gray-900">
					Sign Up
				</h2>

				<form
					action="POST"
					className="mt-4"
					onSubmit={handleSubmit}>
					{/*User Name*/}
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-gray-700 font-medium">
							Username:
						</label>
						<input
							type="text"
							name="username"
							placeholder="username.."
							value={formData.username}
							onChange={handleChange}
							className="text-black mt-1 w-full px-3 py-2 border rounded-md focis:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					{/* Email*/}
					<div className="mb-4">
						<label
							htmlFor="email "
							className="block text-gray-700 font-medium">
							Email:
						</label>
						<input
							type="email"
							name="email"
							placeholder="email@email.com.."
							required
							value={formData.email}
							onChange={handleChange}
							className="text-black mt-1 w-full px-3 py-2 border rounded-md focis:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					{/* Password*/}
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium">
							Password:
						</label>
						<input
							type="password"
							name="password"
							placeholder="password..."
							required
							value={formData.password}
							onChange={handleChange}
							className="text-black mt-1 mb-4 w-full px-3 py-2 border rounded-md focis:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-indigo-900 transition">
						{loading ? "Creating Account..." : "Sign Up"}
					</button>
					{message && (
						<p className="text-black mt-4 text-center text-sm">
							{message}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
