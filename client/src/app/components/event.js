import Link from 'next/link'

export default function Event({
	title,
	id,
	description,
	location,
	genre,
	startDate,
	endDate,
}) {
	return (
		<div key={id} className="p-6 rounded-lg shadow-lg mb-4">
			<Link
				href={"events/" + id}
				key={id}
				className="text-2xl font-semibold text-purple-500">
				{title}
			</Link>
			<p className="text-lg mt-2">{description}</p>
			<p className="text-sm text-gray-400 mt-2">{location}</p>
			<span className="text-sm text-purple-300">{genre}</span>
			<br />
			<span className="text-sm text-gray-500 mt-2">
				{new Date(startDate).toLocaleDateString("en-US")}-
				{new Date(endDate).toLocaleDateString("en-US")}
			</span>
		</div>
	);
}
