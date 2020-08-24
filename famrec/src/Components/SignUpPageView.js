import React from 'react';
import axios from 'axios';

import SignUpForm from './SignUpForm';

class SignUpPageView extends React.Component {
    state = {
        user: {
            username: '',
            password: ''
        }
        
    };


    // event handler that updates the form fields when it is changed by the user
    handleChanges = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            } 
        });
    }

    
    submitLogin = event => {
        event.preventDefault();


        if (!this.state.user.username || !this.state.user.password) {
            alert("Please provide a username and password.");
        } else {
            // API ADDRESS HERE
            axios
            .post('API ADDRESS GOES HERE', this.state.user)
           
            .then(res => {
                console.log(res, res.data.token)
                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user_id', res.data.id);
                window.location.reload();
                this.props.history.push('/recipes');   
            })
            .catch(err => {
                console.log(err);
                alert("Failed sign up attempt. That username might already exist.");
            })
        }
    }

    // renders the signup form component and passes it props
    render() {
        return (
            <div>
                <SignUpForm 
                    handleChanges={this.handleChanges}
                    submitLogin={this.submitLogin}
                    user={this.state.user}
                />
            </div>
        )
    }
}

export default SignUpPageView;