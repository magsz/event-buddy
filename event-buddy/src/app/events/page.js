"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Events() {
	const [events, setEvents] = useState([]);
	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	const router = useRouter();

	useEffect(() => {
		async function fetchEvents() {
			try {
				const token = localStorage.getItem("token");

				if (!token) {
					router.push("/login");
					return;
				}

				const response = await fetch(
					"http://localhost:8000/events",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				setEvents(data);

				// if (Array.isArray(data)) {
				// 	setEvents(data);
				// } else {
				// 	setEvents([]);
				// }
			} catch (err) {
				console.error("Error fetching events:", err.message);
			}
		}
		fetchEvents();
	}, []);

	async function fetchSearchQuery(query) {
		try {
			setEvents([]);
			const token = localStorage.getItem("token");

			const res = await fetch(
				`http://localhost:8000/events/search?search=${query}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await res.json();
			setEvents(data);

			// if (Array.isArray(data)) {
			// 	setEvents(data);
			// } else {
			// 	setEvents([]);
			// }
		} catch (err) {
			console.error("Error fetching events:", err.message);
		}
	}

	function handleSearchQuery(e) {
		setQuery(e.target.value);
	}

	function handleSearch() {
		fetchSearchQuery(query);
	}

	const eventsList = events.map((event) => (
		<div key={event.id} className="p-6 rounded-lg shadow-lg mb-4">
			<Link
				href={"events/" + event.id}
				key={event.id}
				className="text-2xl font-semibold text-purple-500">
				{event.title}
			</Link>
			<p className="text-lg mt-2">{event.description}</p>
			<p className="text-sm text-gray-400 mt-2">{event.location}</p>
			<span className="text-sm text-purple-300">{event.genre}</span>
			<br />
			<span className="text-sm text-gray-500 mt-2">
				{new Date(event.startdate).toLocaleDateString("en-US")}-
				{new Date(event.enddate).toLocaleDateString("en-US")}
			</span>
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
					onChange={handleSearchQuery}
					className="w-full max-w-md px-4 py-2 border text-black border-purple-500 rounded-lg focus:outline-none focus:ring-purple-400"></input>
				<button
					onClick={handleSearch}
					className="px-4 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-500 transition duration-300">
					Search
				</button>
			</div>
			<div className="max-w-3xl mx-auto">{eventsList}</div>
		</div>
	);
}
