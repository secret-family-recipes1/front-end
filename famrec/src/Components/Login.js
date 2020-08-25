import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import FormSchema from './validation/FormSchema'

import {axiosWithAuth} from '../utils/axiosWithAuth'


const Login = (props) => {
const [credentials, setCredentials] = useState({
    email: '',
    password: ''
})

const history = useHistory()


	const update = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setCredentials({...credentials,
			[name]: value
		});
	}

    const onSubmit = e => {
		e.preventDefault()
		if (
		  !credentials.email.trim() ||
		  !credentials.password.trim())
		{
		  return 
		} else {
			console.log('logging in')
			axiosWithAuth()
			.post('/api/users/login', credentials)
	
			.then(res => {
                console.log('response', res.data.token)
                localStorage.setItem('token', res.data.token);
                history.push('/recipes'); 
				console.log('you are logged in')   
				props.setIsLoggedIn(true)            
			})
			.catch(err => {
				console.log(err);
				console.error(err)
				alert("Login failed. Please check username and password.");
			})
		}
	} 

		return (
			<div className="login">
				<form onSubmit={onSubmit}>
					<h2>Login</h2>
					<div className="username">
						<input
							type="text"
							placeholder="Username"
							value={credentials.email}
							onChange={update}
							name="email"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password"
							value={credentials.password}
							onChange={update}
							name="password"
						/>
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/signup">Create an account</Link>
			</div>
		);
}

export default Login;