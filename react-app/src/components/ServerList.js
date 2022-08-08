import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getAllServers} from '../../src/store/server'
import {getAllChannels} from '../../src/store/channel'

function ServerList() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = Object.values(useSelector(state => state.server)).reverse()
    const channels = Object.values(useSelector(state => state.channel))

    useEffect(() => {
        dispatch(getAllServers())
        dispatch(getAllChannels())
    }, [dispatch])

    const handleCreateServer = async () => {
        
    }

    return (
        <>
        <h1>Server List component</h1>
        {servers && servers.map(server => {
            return (
                <>
                <div key={server.id}>{server.server_name}</div>
                </>
            )
        })}
        <button onClick={handleCreateServer}>Create Server</button>
        </>
    )
}

export default ServerList
