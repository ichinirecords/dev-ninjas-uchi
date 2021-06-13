import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./logo.svg";
import { Button } from '@material-ui/core';

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
		<main role="main">
			<div>
				<header className='header'>
					<img className="logo" data-qa="logo" src={logo} alt="Just the React logo" />
					<div className='about-and-login'>
						<Button color='primary' className='about' component={Link} to="/about/this/site">About</Button>
						<Button component={Link} to="/login" color='primary'>Admin Login</Button>
					</div>
				</header>
				<h1 className="message" data-qa="message">{message}</h1>
			</div>
		</main>
	);
}

export default Home;
