import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import {getAllServers} from '../../store/server'
import {getAllChannels} from '../../store/channel'
import { io } from 'socket.io-client';
import ServerList from '../Servers/ServerList';
import './channels.css'
import Chat from './Chat';

let socket;

function ChannelList () {
    const dispatch = useDispatch()
    const {serverId} = useParams()

    const user = useSelector(state => state?.session.user)
    const server = Object.values(useSelector(state => state?.server)).filter(server => server?.id === Number(serverId))[0]
    const channels = Object.values(useSelector(state => state?.channel)).filter(channel => channel?.server_id === Number(serverId))
    console.log('CHANNELs HEREEEEEEEEEE', server)

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
                {server && <h3>{server.server_name}</h3>}
                {channels && channels.map(channel => {
                    return (
                        <>
                        <h3>{channel.channel_name}</h3>
                        </>
                    )
                })}
            </div>

        </div>
            <div className='sc-chatbox'>
                <Chat />
            </div>
        </div>
        </>
    )
}

export default ChannelList
