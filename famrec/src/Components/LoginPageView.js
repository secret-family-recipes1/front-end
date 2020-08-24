import React from 'react';
import axios from 'axios';

import LoginForm from './LoginForm';

class LoginPageView extends React.Component {
    state = {
        user: {
            username: '',
            password: ''
        }
    };


    handleChanges = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            } 
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        
        if (!this.state.user.username || !this.state.user.password) {
            alert("Please provide a username and password.");
        } else {
            // API ADDRESS GOES HERE
            axios
                .post(' API ADDRESS /auth/login', this.state.user)
               
                .then(res => {
                    console.log('response', res.data.token)
                    localStorage.setItem('jwt', res.data.token);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('user_id', res.data.id);
                    window.location.reload();
                    this.props.history.push('/recipes');                    
                })
                .catch(err => {
                    console.log(err);
                    alert("Login failed. Please check username and password.");
                })

            
        } 
    }

    render() {
        return (
            <div>
                <LoginForm
                    handleChanges={this.handleChanges}
                    submitLogin={this.handleSubmit}
                    user={this.state.user}
                />
            </div>
        )
    }
}

export default LoginPageView;