import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Checks if user is has a token, redirects to login if not, renders requested component if yes
const PrivateRoute = ({component: Component, ...rest}) => {
return <Route {...rest} render={() => {
if(localStorage.getItem('token')){
    console.log('token found')
// render the component that is passed in via props.components if logged in
return <Component />
} else {
    console.log('token not found')
    // Redirect to login if not logged in
return <Redirect to='/login' />
}
}}/>
}

export default PrivateRoute