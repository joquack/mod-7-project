import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
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

    useEffect(() => {
        dispatch(getAllServers())
        dispatch(getAllChannels())
    }, [dispatch])

    return (
        <>
        <div className='server-list'>
            <div className='all-servers'>
                <NavLink to={'/channels/me'}><img className='server-home' src='https://cdn-icons-png.flaticon.com/512/5968/5968759.png' alt='server-home'></img></NavLink>

                {servers && servers.map(server => {
                    return (
                        <>
                        <div key={server.id}>
                            <NavLink to={`/channels/${server.id}`}>
                                <img key={`${server.id}`} src={server.server_img} className='server-list-img' alt={`server-${server.id}`}></img>
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
            </div>
            <div><ServerFormModal /></div>
        </div>
        </>
    )
}

export default ServerList
