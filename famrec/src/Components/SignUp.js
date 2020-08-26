import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid'; // universally unique ID - generates a random unique ID
import FormSchema from './validation/FormSchema'
import * as yup from 'yup'

import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialTeamList = []

const initialFormValues = {
	// text inputs
	firstname: '',
	lastname: '',
	email: '',
	password: ''
  }

  const initialFormErrors = {
	firstname: '',
	lastname: '',
	email: '',
	password: ''
  }
  
const SignUp = props => {
	const [members, setMembers] = useState(initialTeamList)
	const [formErrors, setFormErrors] = useState(initialFormErrors)
	const [formValues, setFormValues] = useState(initialFormValues)
	const history = useHistory()

	const update = (e) => {
		const { name, value } = e.target
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
  
	  setFormValues({
		...formValues,
		[name]: value
	  })
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

	const onSubmit = e => {
		e.preventDefault()
		if (
		  !formValues.firstname.trim() ||
		  !formValues.lastname.trim() ||
		  !formValues.email.trim() ||
		  !formValues.password.trim())
		{
		  return 
		} else {
			console.log('registering')
			axiosWithAuth()
			.post('/api/users/register', formValues)
			.then(res => {
				console.log('response', res)
				history.push('/login');                    
			})
			.catch(err => {
				console.log(err);
				console.error(err)
				alert("Login failed. Please check username and password.");
			})
		}
	} 

		return (
			<div className="register">
				<form onSubmit={onSubmit}>
					<h2>Register</h2>
					<p>{formErrors.firstname}</p>
					<div className="name">
						<input
							type="text"
							placeholder="First Name"
							name="firstname"
							value={formValues.firstname}
							onChange={update}
						/>
					</div>
					<div className="name">
						<input
							type="text"
							placeholder="Last Name"
							name="lastname"
							value={formValues.lastname}
							onChange={update}
						/>
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Enter your email"
							name="email"
							value={formValues.email}
							onChange={update}
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={formValues.password}
							onChange={update}
						/>
					</div>

					<div className="password">
						<input type="password" placeholder="Confirm Password" name="password1" />
					</div>

					<input type="submit" value="Register" />
				</form>

				<Link to="/login">Login Here</Link>
			</div>
		);
}

export default SignUp;