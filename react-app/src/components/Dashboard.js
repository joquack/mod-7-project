import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getAllServers} from '../../src/store/server'


function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = Object.values(useSelector(state => state.server)).reverse()
    console.log(servers,'HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')

    useEffect(() => {
        dispatch(getAllServers())
    }, [dispatch])

    return (
        <>
        <h1>dashboard</h1>
        {servers && servers.map(server => {
            return (
                <div key={server.id}>{server.server_name}</div>
            )
        })}
        </>
    )
}

export default Dashboard
