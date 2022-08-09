// import { NavLink, useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import {getAllServers} from '../../store/server'
import {getAllChannels} from '../../store/channel'
import ServerList from '../Servers/ServerList';
import './channels.css'

function ChannelList () {
    const dispatch = useDispatch()
    const {serverId} = useParams()
    const user = useSelector(state => state.session.user)
    console.log('CHANNELs HEREEEEEEEEEE', serverId)
    return (
        <>
        <ServerList />
        <div className='server-channels'>
            <h1>channels hereeeeee</h1>
        </div>
        </>
    )
}

export default ChannelList
