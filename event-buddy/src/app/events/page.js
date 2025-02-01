

export default async function Events() {

	const data = await fetch("http://localhost:8000/events");
	const events = await data.json();
	console.log(events);

    const eventsList = events.map((event) => (
        <div key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <span>{event.genre}</span>
            <br />
            <span>
                {new Date(event.startdate).toLocaleDateString(
                    "en-US"
                )}
                <br />
                {new Date(event.enddate).toLocaleDateString(
                    "en-US"
                )}
            </span>
        </div>
    ))

	return (
		<div>
			<h1>Events Page</h1>
			{eventsList}
		</div>
	);
}
