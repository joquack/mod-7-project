import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {getAllServers} from '../../store/server'
import {getAllChannels} from '../../store/channel'
import ServerFormModal from './ServerFormModal'
import UpdateServerModal from './UpdateServerModal';
import './server.css'

function ServerList() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const servers = Object.values(useSelector(state => state.server)).reverse()
    const channels = Object.values(useSelector(state => state?.channel))

    useEffect(() => {
        dispatch(getAllServers())
        dispatch(getAllChannels())
    }, [dispatch])

    return (
        <>
        <div className='server-list'>
            <NavLink to={'/channels/me'}><img className='server-home' src='https://cdn-icons-png.flaticon.com/512/5968/5968759.png'></img></NavLink>

            {servers && servers.map(server => {
                return (
                    <>
                    <div key={server.id}>
                        <NavLink to={`/channels/${server.id}`}>
                            <img key={`${server.id}-img`}src={server.server_img} className='server-list-img'></img>
                        </NavLink>
                    </div>
                    <div>
                        {userId && server.user_id === userId ?
                            <UpdateServerModal id={server.id}/>
                            : <></>
                        }
                    </div>
                    </>
                )
            })}
            <div><ServerFormModal /></div>
        </div>
        </>
    )
}

export default ServerList
