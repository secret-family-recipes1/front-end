import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

function LoginForm(props) {
    return (
        <div className="loginForm">
            <form onSubmit={props.submitLogin}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                    <Input 
                    name="username"
                        placeholder=""
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
                        placeholder="" 
                        type="text" 
                        
                        onChange={props.handleChanges}
                        value={props.user.password} 
                    />
                <InputGroupAddon addonType="append">
                    <Button color="secondary">Log In</Button>
                </InputGroupAddon>
                </InputGroup>

                
            </form>

        </div>
    )
}

export default LoginForm;
    
