import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginSignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let errArr = []
    if(!username.length)
      errArr.push('Username cannot be empty')

    if(!email.length)
      errArr.push('Email cannot be empty')

    if(password !== repeatPassword)
      errArr.push('Passwords have to match')

    setErrors(errArr)
  }, [password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='signup-page'>
      <div className='signup-auth-form'>
        <h1 className='signup-login-big'>Create an account</h1>
        <form onSubmit={onSignUp}>
          <div className='errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-login-field'>
            <label>User Name</label>
            <input
              className='signup-login-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='signup-login-field'>
            <label>Email</label>
            <input
              className='signup-login-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='signup-login-field'>
            <label>Password</label>
            <input
              className='signup-login-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='signup-login-field'>
            <label>Repeat Password</label>
            <input
              className='signup-login-input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className='signup-login-button' type='submit' disabled={errors.length}>Sign Up</button>
        </form>
        <div className='switch'>
          <div className='switch-link'>
            <NavLink to={'/login'} className='back-home'>Already have an account?</NavLink>
          </div>
        </div>
        <div>
          <NavLink to={'/'} className='back-home'>Back Home</NavLink>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUpForm;
