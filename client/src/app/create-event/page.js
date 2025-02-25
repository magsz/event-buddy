"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		startDate: "",
		endDate: "",
		location: "",
		genre: "",
	});

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/login");
			return;
		}
	}, []);

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
				startDate: "",
				endDate: "",
				location: "",
				genre: "",
			});
		} catch (error) {
			setMessage("Error: " + error.message);
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
					className="createFormInput"
					required
				/>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description"
					className="createFormInput"
					required></textarea>
				<input
					type="date"
					name="startDate"
					value={formData.startDate}
					onChange={handleChange}
					className="createFormInput"
					required
				/>
				<input
					type="date"
					name="endDate"
					value={formData.endDate}
					onChange={handleChange}
					className="createFormInput"
					required
				/>
				<input
					type="text"
					name="location"
					value={formData.location}
					onChange={handleChange}
					placeholder="Location"
					className="createFormInput"
					required
				/>
				<input
					type="text"
					name="genre"
					value={formData.genre}
					onChange={handleChange}
					placeholder="Genre"
					className="createFormInput"
					required
				/>
				<button
					type="submit"
					className="createFormButton"
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
