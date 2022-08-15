import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './SplashPage.css'

function SplashPage() {
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
                        <h2>Logo</h2>
                        <a href='https://github.com/joquack/mod-7-project' target="_blank" rel="noopener noreferrer">Clone this repo</a>
                        <button>Login</button>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <h2>below banner</h2>
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
