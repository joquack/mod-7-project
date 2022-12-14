import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginSignUp.css'

const LoginForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state?.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    // setShowModal(false)
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/channels/me' />;
  }

  return (
    <>
    <div className='login-page'>
      <div className='login-auth-form'>
        <h1 className='signup-login-big'>Welcome back!</h1>
        <h4 className='signup-login-small'>We're so excited to see you again</h4>
        <form onSubmit={onLogin}>
          <div className='errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
          </div>
          <div className='signup-login-field'>
            <label htmlFor='email' className='input-label'>Email <span className='required'>*</span> </label>
            <input
              className='signup-login-input'
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='signup-login-field'>
            <label htmlFor='password' className='input-label'>Password <span className='required'>*</span> </label>
            <input
              className='signup-login-input'
              name='password'
              type='password'
              // placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className='signup-login-button' type='submit'>Log In</button>
          <div className='switch'>
            <h3>Need an account?</h3>
            <div className='switch-link'>
              <NavLink to={'/sign-up'} className='back-home'>Register</NavLink>
            </div>
          </div>
          <div>
            <NavLink to={'/'} className='back-home'>Back Home</NavLink>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
