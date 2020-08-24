import React from 'react';
import {InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

function SignUpForm(props) {
    return (
        <div className="loginForm">
            <h3>Please provide a username and password to signup.</h3>
            <form onSubmit={props.submitLogin}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                    <Input
                        name="username"
                        placeholder="type a username"
                        type="text"
                        onChange={props.handleChanges}
                        value={props.user.username}
                    />
                </InputGroup>
                <br />
                <InputGroup>
                <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
                    <Input
                        name="password" 
                        placeholder="type a password" 
                        type="text" 
                        
                        onChange={props.handleChanges}
                        value={props.user.password} 
                    />
                <InputGroupAddon addonType="append">
                    <Button color="secondary">Sign Up</Button>
                </InputGroupAddon>
                </InputGroup>
            </form>
        </div>
    )
}

export default SignUpForm;