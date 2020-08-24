import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'; // universally unique ID - generates a random unique ID

import './App.css';
import Member from './components/Member';
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'

const initialTeamList = [
  // {
  //   id: uuid(), 
  //   name: 'Nicole', 
  //   email: 'nicole-tilbe@lambdastudents.com', 
  //   role: 'Full Stack Developer',
  // }
]

const initialFormValues = {
  // text inputs
  name: '', 
  email: '',
  // dropdown options
  role: '',
}

export default function App() {
  // giving state variables initial value
  const [members, setMembers] = useState(initialTeamList)
  const [formValues, setFormValues] = useState(initialFormValues)

  const onInputChange = e => {
    const { name } = e.target
    const { value } = e.target
    setFormValues({...formValues, [name]: value})
  }

  const onSubmit = e => {
    e.preventDefault()
    if (
      !formValues.name.trim() ||
      !formValues.email.trim())
    {
      return 
    }
    const newMember = { ...formValues, id: uuid() }

    setMembers([newMember, ...members])

    setFormValues(initialFormValues)
  }

  return (
    <div className="App container"> 
      <Switch>
        <Route path='/signup'>
          <Link className="headerName" to='/'>
            <h1>Recipe Box</h1>
          </Link>
          <SignUp
            values={formValues}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        </Route>
        <Route path='/login'>
          <Link className="headerName" to='/'>
            <h1>Recipe Box</h1>
          </Link>
          <LogIn
            values={formValues}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        </Route>
      </Switch>
      
        
        {/* mapping through teamMembers array and 'consuming' TeamMember component for each */}
        <div className="Members">
          {
            members.map(member => {
              return (
                <member key={member.id} details={member} />
              )
            })
          }
        </div>
      </div>   
    
  );
}