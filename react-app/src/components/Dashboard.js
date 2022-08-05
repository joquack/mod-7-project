import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getAllServers} from '../../src/store/server'


function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = useSelector(state => state.server)
    console.log(servers, 'OVER HEREEEEEEEEEEEE')

    useEffect(() => {
        dispatch(getAllServers())
    }, [dispatch])

    return (
        <h1>dashboard</h1>
    )
}

export default Dashboard
