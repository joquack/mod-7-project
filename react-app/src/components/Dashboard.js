import React, { useEffect } from 'react';
// import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getAllServers} from '../../src/store/server'
import {getAllChannels} from '../../src/store/channel'
import ServerList from './Servers/ServerList';
import LogoutButton from './auth/LogoutButton';


function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log('dashboard here',user)

    useEffect(() => {
        dispatch(getAllServers())
        dispatch(getAllChannels())
    }, [dispatch])

    return (
        <>
        <div className='dashboard'>
            <div className='d-servers'>
                <ServerList />
            </div>

            <div className='dashboard-main'>
                <div className='d-nav'>
                    <div className='d-nav-top'>
                        <h1>Welcome to your dashboard, {user.username}!</h1>
                        <div>
                            <LogoutButton />
                        </div>
                    </div>

                    <div className='d-content'>
                        <h2 className='get-started'>To get started, click one of the server icons to jump into a server and start chatting.</h2>

                        <div className='user-details'>
                            <div>
                                <img className="d-avatar" src="https://archive.org/download/discordprofilepictures/discordblue.png" alt='user-avatar'></img>
                            </div>

                            <div className='username-email'>
                                <h2>User: {user.username}</h2>
                                <h2>Email: {user.email}</h2>
                            </div>

                        </div>

                        <h2 className='maintenance'>Nothing here for now but more features will be added in a future update</h2>
                    </div>

                </div>
                    <div className='dashboard-footer'>
                        <h4>Wanna learn how this was built? Check out the repo at
                            <span>
                                <a href='https://github.com/joquack/mod-7-project' target="_blank" rel="noopener noreferrer">GitHub</a>
                            </span>
                        </h4>
                    </div>

            </div>

        </div>
        </>
    )
}

export default Dashboard
