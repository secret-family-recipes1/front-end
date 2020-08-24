import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import FormSchema from './validation/FormSchema'


class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.update = this.update.bind(this);

		// this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	// displayLogin(e) {
	// 	e.preventDefault();
	// 	console.log('You are logged in');
	// 	console.log(this.state);
	// 	this.setState({
	// 		email: '',
	// 		password: ''
	// 	});
    // }
    
    onSubmit = e => {
		e.preventDefault()
		if (
		  !this.state.email.trim() ||
		  !this.state.password.trim())
		{
		  return 
		} else {
			console.log('registering')
			console.log(this.props.history)
			axios
			.post('https://back-end-recipes.herokuapp.com/api/auth/login', this.state)
	
			.then(res => {
				console.log('response', res.data.token)
				localStorage.setItem('jwt', res.data.token);
				this.props.history.push('/recipes');                    
			})
			.catch(err => {
				console.log(err);
				console.error(err)
				alert("Login failed. Please check username and password.");
			})
		}
	} 

	render() {
		return (
			<div className="login">
				<form onSubmit={this.onSubmit}>
					<h2>Login</h2>
					<div className="username">
						<input
							type="text"
							placeholder="Username"
							value={this.state.email}
							onChange={this.update}
							name="email"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/signup">Create an account</Link>
			</div>
		);
	}
}

export default Login;