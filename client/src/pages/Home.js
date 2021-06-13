import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import logo from "./logo.svg";
import AdminLogIn from './AdminLogIn';
import { Button } from '@material-ui/core';

export function Home() {
	const [message, setMessage] = useState("Loading...");
	const [logIn, setLogIn] = useState(false);

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
						<Link className='about' to="/about/this/site">About</Link>
						<Button variant='outlined' color='primary' onClick={() => setLogIn(true)}>Admin Log In</Button>
					</div>
				</header>
				<h1 className="message" data-qa="message">{message}</h1>
				<AdminLogIn logIn={logIn} setLogIn={setLogIn}/>
			</div>
		</main>
	);
}

export default Home;
