import React, { useState, useEffect } from 'react';
// import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getAllServers} from '../../store/server'
import {getAllChannels} from '../../store/channel'
import ServerFormModal from './ServerFormModal'
import UpdateServerModal from './UpdateServerModal';
import './server.css'

function ServerList() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = Object.values(useSelector(state => state.server)).reverse()
    const channels = Object.values(useSelector(state => state.channel))

    useEffect(() => {
        dispatch(getAllServers())
        dispatch(getAllChannels())
    }, [dispatch])

    // const handleCreateServer = async () => {
    //     e.preventDefault()
    // }

    return (
        <>
        <h1>Server List component</h1>
        {servers && servers.map(server => {
            return (
                <>
                <div key={server.id}>{server.server_name}</div>
                <img key={`${server.id}-img`}src={server.server_img} className='server-list-img'></img>
                <UpdateServerModal id={server.id}/>
                </>
            )
        })}
        <div><ServerFormModal /></div>
        </>
    )
}

export default ServerList
