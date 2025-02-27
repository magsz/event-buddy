import Link from "next/link";
import NavBar from "./components/navbar";

export default function Home() {
	return (
		<div>
			<NavBar></NavBar>
			<section className="text-center py-20 bg-grey-700 text-white">
				<h1 className="text-4xl font-bold">
					Discover & Manage Events Effortlessly
				</h1>
				<p className="mt-4 text-lg">
					Find exciting events or create your own in just a few
					clicks.
				</p>
				<div className="mt-6 space-x-4">
					<Link
						href="/events"
						className="bg-indigo-900 text-white px-6 py-3 rounded-md hover:bg-purple-500">
						Browse Events
					</Link>
					<Link
						href="/create-event"
						className="bg-indigo-900 text-white px-6 py-3 rounded-md hover:bg-purple-500">
						Create an Event
					</Link>
				</div>
			</section>
		</div>
	);
}
