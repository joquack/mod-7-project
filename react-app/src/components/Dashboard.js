import React, { useState, useEffect } from 'react';
// import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getAllServers} from '../../src/store/server'
import {getAllChannels} from '../../src/store/channel'
import ServerList from './Servers/ServerList';
import LogoutButton from './auth/LogoutButton';
import NavBar from './NavBar';

function Dashboard() {
    const dispatch = useDispatch()

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

            <div className='d-nav'>
                <div>
                    <LogoutButton />
                </div>
                <h1>Welcome to your dashboard</h1>
            </div>
        </div>
        </>
    )
}

export default Dashboard
