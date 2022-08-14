import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import {getAllServers} from '../../store/server'
import {getAllChannels} from '../../store/channel'
import ServerList from '../Servers/ServerList';

function ServerHome () {
    const dispatch = useDispatch()
    const {serverId} = useParams()

    const user = useSelector(state => state?.session.user)
    const server = Object.values(useSelector(state => state?.server)).filter(server => server?.id === Number(serverId))[0]
    const channels = Object.values(useSelector(state => state?.channel)).filter(channel => channel?.server_id === Number(serverId))

    useEffect(() => {
        dispatch(getAllServers())
        dispatch(getAllChannels())
    }, [dispatch])

    return (
        <>
        <div className='sidebar'>
            <div className='server-channels'>
                <div className='sc-servers'>
                    <ServerList />
                </div>

                <div className='sc-channels'>
                    {server && <h3 className='server-name'>{server.server_name}</h3>}
                    {channels && channels.map(channel => {
                        return (
                            <>
                            <NavLink to={`/channels/${serverId}/${channel.id}`} className='channel-link'>
                                <h3>{channel.channel_name}</h3>
                            </NavLink>
                            </>
                        )
                    })}
                </div>
            </div>

            <div className='server-welcome'>
            {server && <h1 className='server-name'>Welcome to {server.server_name}</h1>}
            </div>
        </div>
        </>
    )
}

export default ServerHome
