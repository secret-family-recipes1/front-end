import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import FormSchema from './validation/FormSchema'
import * as yup from 'yup'

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: ''
		};

		this.update = this.update.bind(this);
		// this.displayLogin = this.displayLogin.bind(this);
	}

	update(name, value) {
		yup
		.reach(FormSchema, name)
		.validate(value)
		.then(valid => {
		  setFormErrors({
			...formErrors,
			[name]: "",
		  })
		})
		.catch(err => {
		  setFormErrors({
			...formErrors,
			[name]: err.errors[0],
		  })
		})
		// let name = e.target.name;
		// let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	// displayLogin(e) {
	// 	e.preventDefault();
	// 	console.log('You have successfully registered');
	// 	console.log(this.state);
	// 	this.setState({
	// 		firstName: '',
	// 		lastName: '',
	// 		email: '',
	// 		password: ''
	// 	});
	// }


	onSubmit = e => {
		e.preventDefault()
		if (
		  !this.state.firstname.trim() ||
		  !this.state.lastname.trim() ||
		  !this.state.email.trim() ||
		  !this.state.password.trim())
		{
		  return 
		} else {
			console.log('registering')
			console.log(this.props.history)
			axios
			.post('https://back-end-recipes.herokuapp.com/api/auth/register', this.state)
		   
			.then(res => {
				console.log('response', res.data.token)
				localStorage.setItem('jwt', res.data.token);
				// localStorage.setItem('isLoggedIn', true);
				// localStorage.setItem('user_id', res.data.id);
				// window.location.reload();
				this.props.history.push('/login');                    
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
			<div className="register">
				<form onSubmit={this.onSubmit}>
					<h2>Register</h2>

					<div className="name">
						<input
							type="text"
							placeholder="First Name"
							name="firstname"
							value={this.state.firstname}
							onChange={this.update}
						/>
					</div>
					<div className="name">
						<input
							type="text"
							placeholder="Last Name"
							name="lastname"
							value={this.state.lastname}
							onChange={this.update}
						/>
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={this.update}
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.update}
						/>
					</div>

					<div className="password">
						<input type="password" placeholder="Confirm Password" name="password1" />
					</div>

					<input type="submit" value="Register" />
				</form>

				<Link to="/login ">Login Here</Link>
			</div>
		);
	}
}

export default SignUp;