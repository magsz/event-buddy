"use client";
import { useState, useEffect } from "react";

export default function Events() {
	const [events, setEvents] = useState([]);
	const [selectedRSVPs, setSelectedRSVPs] = useState({}); // Store RSVP per event

	useEffect(() => {
		async function fetchEvents() {
			try {
				const token = localStorage.getItem("token");

				const response = await fetch(
					"http://localhost:8000/events"
				);
				const data = await response.json();
				console.log(data);
				setEvents(data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		}
		fetchEvents();
	}, []);

	/** Handle RSVP Selection */
	const handleSelect = (eventId, value) => {
		setSelectedRSVPs((prev) => ({
			...prev,
			[eventId]: prev[eventId] === value ? "" : value, // Toggle selection
		}));
	};

	const baseStyles =
		"px-4 py-2 rounded-lg transition-all duration-300 font-semibold focus:outline-none";
	const selectedStyles = "bg-purple-600 text-white";
	const unselectedStyles = "bg-gray-200 text-black hover:bg-gray-300";

	const eventsList = events.map((event) => (
		<div key={event.id} className="p-6 rounded-lg shadow-lg mb-4">
			<h3 className="text-2xl font-semibold text-purple-500">
				{event.title}
			</h3>
			<p className="text-lg mt-2">{event.description}</p>
			<p className="text-sm text-gray-400 mt-2">{event.location}</p>
			<span className="text-sm text-purple-300">{event.genre}</span>
			<br />
			<span className="text-sm text-gray-500 mt-2">
				{new Date(event.startdate).toLocaleDateString("en-US")}
				<br />
				{new Date(event.enddate).toLocaleDateString("en-US")}
			</span>

			{/* RSVP Buttons */}
			<div className="mt-4 flex gap-4">
				{!selectedRSVPs[event.id] ? (
					<>
						<button
							onClick={() =>
								handleSelect(event.id, "Going")
							}
							className={`${baseStyles} ${unselectedStyles}`}>
							Going
						</button>
						<button
							onClick={() =>
								handleSelect(event.id, "Maybe")
							}
							className={`${baseStyles} ${unselectedStyles}`}>
							Maybe
						</button>
						<button
							onClick={() =>
								handleSelect(event.id, "Not Going")
							}
							className={`${baseStyles} ${unselectedStyles}`}>
							Not Going
						</button>
					</>
				) : (
					<button
						onClick={() =>
							handleSelect(
								event.id,
								selectedRSVPs[event.id]
							)
						}
						className={`${baseStyles} ${selectedStyles}`}>
						{selectedRSVPs[event.id]}
					</button>
				)}
			</div>
		</div>
	));

	return (
		<div className="min-h-screen py-12 px-4">
			<h1 className="text-4xl font-extrabold text-center text-purple-500 mb-8">
				Events Page
			</h1>
			<div className="flex justify-center mb-6">
				<input
					type="text"
					placeholder="Search for events..."
					className="w-full max-w-md px-4 py-2 border text-black border-purple-500 rounded-lg focus:outline-none focus:ring-purple-400"></input>
				<button className="px-4 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-500 transition duration-300">
					Search
				</button>
			</div>
			<div className="max-w-3xl mx-auto">{eventsList}</div>
		</div>
	);
}
