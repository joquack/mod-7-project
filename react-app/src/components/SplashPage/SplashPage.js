import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import './SplashPage.css'

function SplashPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('demo@aa.io');
    const [password, setPassword] = useState('password');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.login( credential, password ))
        history.push('/channels/me')

      }

    const loginButton = async e => {
        history.push('/login')
    }

    const signUpButton = async e => {
        history.push('/sign-up')
    }

    return(
        <>
        <div className='splash-page'>
            <div className="banner-header">
                <div className="banner-img-1"></div>
                <div className="banner-img-center"></div>
                <div className="banner-img-2"></div>
            </div>

            <div className='top'>
                <div className='top-box'>
                    <div className='header-info'>
                        <div className='logo'>
                            <img className='logo-img' src={require('./duck.png').default} alt='logo'></img>
                            <div className='logo-text'>Quackord</div>
                        </div>
                        <a href='https://github.com/joquack/mod-7-project' target="_blank" rel="noopener noreferrer">Clone this repo</a>
                        <div className='nav-buttons'>
                            <button onClick={loginButton}>Login</button>
                            <button onClick={signUpButton}>Sign up</button>
                            <button onClick={handleSubmit}>Demo</button>
                        </div>
                    </div>
                    <div className='splash-words'>
                        <h1>IMAGINE A PLACE...</h1>
                        <p>...where you can belong to a school club, a gaming group, or a worldwide art community.
                             Where just you and a handful of friends can spend time together.
                              A place that makes it easy to talk every day and hang out more often.
                        </p>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <h1>Create an invite-only place where you belong</h1>
                <p>Discord servers are organized into topic-based channels where you can collaborate,
                     share, and just talk about your day without clogging up a group chat.
                     </p>
            </div>

            <div className='footer'>
                    <a href='https://github.com/joquack' target="_blank" rel="noopener noreferrer" className='git'>Github</a>
                    <a href='https://linkedin.com/in/cruz-joel' target="_blank" rel="noopener noreferrer" className='linked'>LinkedIn</a>
            </div>
        </div>
        </>
    )
}

export default SplashPage
