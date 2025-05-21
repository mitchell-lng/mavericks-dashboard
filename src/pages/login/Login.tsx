import './login.css'

import React, { useState } from "react";
import { useAuth } from "../../hooks/Auth";

import { Card } from "../../components";

import { TextField } from "@mui/material"

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	const { login } = useAuth();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    
		if (username === "user" && password === "password") {
			await login(username, password);
		} else {
			setError("Invalid username or password");
		}
	};

	return (
	<div className='landing'>
		<div className="landing-content">
			<Card>
				<Card.Header>
					<h1>Login</h1>
				</Card.Header>
				<Card.Body>	
					<form onSubmit={handleLogin} className='login-form'>
						<div>
							<TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
						</div>
						<div>
							<TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						{error && <p className="error">{error}</p>}
						<button type="submit" className='button'>Login</button>
					</form>
				</Card.Body>
			</Card>
		</div>
    </div>
  );
}

export default Login