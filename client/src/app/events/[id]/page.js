"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "@/app/components/navbar";

export default function EventDetail() {
	const { id } = useParams();
	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");
	const [event, setEvent] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [rsvp, setRsvp] = useState(true);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		location: "",
		startdate: "",
		enddate: "",
		genre: "",
	});

	const router = useRouter();

	useEffect(() => {
		async function fetchEvent() {
			try {
				const response = await fetch(
					`http://localhost:8000/events/${id}`
				);
				if (!response.ok) throw new Error("Failed to fetch event");
				const data = await response.json();
				setEvent(data);
				setFormData(data);
			} catch (error) {
				alert(error);
			}
		}

		fetchEvent();
	}, [id]);

	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleEdit() {
		try {
			const response = await fetch(
				`http://localhost:8000/events/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const updatedEvent = await response.json();
				setEvent(updatedEvent);
				setIsEditing(false);
				router.push("/events");
			}
		} catch (error) {
			alert(error);
		}
	}

	async function handleDelete() {
		try {
			const response = await fetch(
				`http://localhost:8000/events/${id}`,
				{
					method: "DELETE",
					Authorization: `Bearer ${token}`,
				}
			);

			if (response.ok) {
				alert("Event deleted!");
				router.push("/events");
			}
		} catch (error) {
			alert(error);
		}
	}

	async function handleRsvp() {
		setRsvp((prev) => !prev);
		if (rsvp) {
			try {
				const response = await fetch(
					`http://localhost:8000/events/${id}/rsvp`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							user_id: userId,
							status: "going",
						}),
					}
				);

				const data = await response.json();
			} catch (error) {
				alert(error);
			}
		} else {
			const response = await fetch(
				`http://localhost:8000/events/${id}/rsvp`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id: userId,
					}),
				}
			);

			const data = await response.json();
		}
	}

	if (!event) return <p>Loading event details...</p>;

	return (
		<>
			<NavBar></NavBar>
			<div className="min-h-screen flex flex-col items-center justify-center">
				{isEditing ? (
					<div className="bg-purple-200 shadow-md rounded-lg p-6 w-ful max-w-md">
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
							required
						/>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
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
							className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
							required
						/>
						<input
							type="text"
							name="genre"
							value={formData.genre}
							onChange={handleChange}
							className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
							required
						/>
						<button
							type="submit"
							onClick={handleEdit}
							className="p-2  mr-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition">
							Save
						</button>
						<button
							onClick={() => {
								setIsEditing(false);
							}}
							className="p-2  mr-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition">
							Cancel
						</button>
						<button
							onClick={handleDelete}
							className="p-2  mr-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition">
							Delete
						</button>
					</div>
				) : (
					//Conditionally render
					//Edit Mode
					//View mode

					<div className="flex justify-center items-center pt-10">
						<div className="p-6 rounded-lg shadow-lg mb-4">
							<h1 className="text-2xl font-semibold text-purple-500">
								{event.title}
							</h1>
							<p className="text-lg mt-2">
								{event.description}
							</p>
							<p className="text-sm text-gray-400 mt-2">
								Location: {event.location}
							</p>
							<span className="text-sm text-gray-500 mt-2">
								{new Date(
									event.startdate
								).toLocaleDateString("en-US")}{" "}
								-
								{new Date(
									event.enddate
								).toLocaleDateString("en-US")}
							</span>
							<div className="mt-4 flex gap-4">
								<button
									className="text-sm w-12 h-6 rounded-md bg-gray-200 text-black hover:bg-gray-300"
									onClick={() => {
										setIsEditing(true);
									}}>
									Edit
								</button>
								<button
									className="text-sm w-12 h-6 rounded-md bg-gray-200 text-black hover:bg-gray-300"
									onClick={handleRsvp}>
									{rsvp ? "RSVP" : "✔️"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
