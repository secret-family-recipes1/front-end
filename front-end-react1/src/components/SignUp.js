import React from 'react'

export default function SignUp(props) {
    const {
        values,
        onInputChange,
        onSubmit,
    } = props

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Sign Up</h2>
            </div>
            <div className='form-group inputs'>
                <h4>Information</h4>

                <label>Name:&nbsp;
                    <input
                        type='text'
                        placeholder='Johnny Appleseed'
                        maxLength='30'
                        name='name'
                        value={values.name}
                        onChange={onInputChange}
                    /> 
                    <p></p>
                </label>

                <label>Email:&nbsp;
                    <input
                        type='email'
                        placeholder='JohnAppleseed@gmail.com'
                        maxLength='30'
                        name='email'
                        value={values.email}
                        onChange={onInputChange}
                    />
                    <p></p>
                </label>
                <label>Password:&nbsp;
                    <input
                        type='text'
                        placeholder='Password'
                        maxLength='30'
                        name='password'
                        value={values.password}
                        onChange={onInputChange}
                    />
                </label>
            </div>
            <p> </p>
            <button>submit</button>
        </form>
    )
}