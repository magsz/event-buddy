"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetail() {
	const { id } = useParams();
	const [event, setEvent] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchEvent() {
			try {
				const response = await fetch(
					`http://localhost:8000/events/${id}`
				);
				if (!response.ok) throw new Error("Failed to fetch event");
				const data = await response.json();
				setEvent(data);
			} catch (err) {
				setError(err.message);
			}
		}

		fetchEvent();
	}, [id]);

	if (error) return <p>Error: {error}</p>;
	if (!event) return <p>Loading event details...</p>;

	return (
		<div>
			<h1>{event.title}</h1>
			<p>{event.description}</p>
			<p>Location: {event.location}</p>
			<p>Start Time: {new Date(event.startdate).toLocaleDateString}</p>
			<p>End Time: {new Date(event.enddate).toLocaleDateString}</p>
		</div>
	);
}
