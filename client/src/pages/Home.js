import { useEffect, useState } from "react";
import "./Home.css";
import ArtistsStoryCards from '../components/ArtistsStoryCards';
import AppHeader from '../components/AppHeader';
import Educational from '../components/Educational';

export function Home() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main className='main' role="main">
			<AppHeader />
			<Educational />
			<ArtistsStoryCards />
		</main>
	);
}

export default Home;
