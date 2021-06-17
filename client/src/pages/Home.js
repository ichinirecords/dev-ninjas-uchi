import { useEffect, useState } from "react";
import Sticky from "react-stickynode";
import "./Home.css";
import ArtistsStoryCards from "../components/ArtistsStoryCards";
import AppHeader from "../components/AppHeader";
import Educational from "../components/Educational";
import DonateLink from "../components/DonateLink";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

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
		<>

			<Button component={Link} to="/upload" color="primary">
        Upload
			</Button>
			<Sticky enabled={true} top={50}>
				<DonateLink />
			</Sticky>
			<main className="main" role="main">
				<AppHeader />
				<ArtistsStoryCards />
			</main>
		</>
	);
}

export default Home;
