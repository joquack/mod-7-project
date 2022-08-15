import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './SplashPage.css'

function SplashPage() {
    return(
        <>
        <div className="banner-header">
            <div className="banner-img-1"></div>
            <div className="banner-img-center"></div>
            <div className="banner-img-2"></div>
        </div>

        <div className='footer'>
                <a href='https://github.com/joquack' target="_blank" rel="noopener noreferrer" className='git'>Github</a>
                <a href='https://linkedin.com/in/cruz-joel' target="_blank" rel="noopener noreferrer" className='linked'>LinkedIn</a>
        </div>
        </>
    )
}

export default SplashPage
