// import { NavLink, useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
import {getAllServers} from '../../store/server'
import {getAllChannels} from '../../store/channel'
import ServerList from '../Servers/ServerList';

function ChannelList () {
    return (
        <>
        <div className='server-channels'>
            <ServerList />
            <h2>channels here</h2>
        </div>
        </>
    )
}

export default ChannelList
