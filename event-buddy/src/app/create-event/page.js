"use client";
import { useState } from "react";

export default function CreateEvent() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		startdate: "",
		enddate: "",
		location: "",
		genre: "",
	});

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	// Handle input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const token = localStorage.getItem("token");

			const response = await fetch("http://localhost:8000/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to create event: ${response.statusText}`
				);
			}

			const data = await response.json();
			setMessage("Event created successfully!");
			setFormData({
				title: "",
				description: "",
				startdate: "",
				enddate: "",
				location: "",
				genre: "",
			});
		} catch (err) {
			setMessage("Error: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold mb-6 text-purple-700">
				Create an Event
			</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-purple-200 shadow-md rounded-lg p-6 w-full max-w-md">
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="Title"
					className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description"
					className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
					required></textarea>
				<input
					type="date"
					name="startdate"
					value={formData.startdate}
					onChange={handleChange}
					className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
				<input
					type="date"
					name="enddate"
					value={formData.enddate}
					onChange={handleChange}
					className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
				<input
					type="text"
					name="location"
					value={formData.location}
					onChange={handleChange}
					placeholder="Location"
					className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
				<input
					type="text"
					name="genre"
					value={formData.genre}
					onChange={handleChange}
					placeholder="Genre"
					className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
				<button
					type="submit"
					className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition"
					disabled={loading}>
					{loading ? "Creating..." : "Create Event"}
				</button>
				{message && (
					<p className="text-black mt-4 text-center text-sm">
						{message}
					</p>
				)}
			</form>
		</div>
	);
}
