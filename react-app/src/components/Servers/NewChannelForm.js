import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllChannels, createChannel } from '../../store/channel';

const NewServerForm = ({setShowModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errArr = []
        if(name.length == 0)
            errArr.push('Name cannot be empty')

        if(name.length > 255)
            errArr.push('Name cannot be more than 255')

        if(description.length > 255)
            errArr.push('Name cannot be more than 255')

        setErrors(errArr)
    }, [name, description])

    const changeName = e => setName(e.target.value)
    const changeDescription = e => setDescription(e.target.value)

    const handleCreateChannel = async e => {
        e.preventDefault()
        setErrors([])

        const data = {
            user_id: userId,
            server_name: name,
            server_img: img
        }

        const createdServer = await dispatch(createServer(data))
        await dispatch(getAllServers())

        if(createdServer){
            const defaultChannelData = {
                server_id: createdServer.id,
                channel_name: 'general',
                description: 'general chat'
            }

            const defaultChannel = await dispatch(createChannel(defaultChannelData))
            await dispatch(getAllChannels())

            if(createdServer && defaultChannel){
                setShowModal(false)
                history.push(`/channels/${createdServer.id}`)
            }
        }
    }

    return (
        <>
        <div className='create-server'>
            <div className='create-server-customize'>
                <div className='create-server-big'>Customize your server</div>
                <div className='create-server-small'>Give your new server a personality with a name and an icon. You cannot change it...for now</div>
            </div>
            <form onSubmit={handleCreateServer}>
                <div className='errors'>
                    <ul>
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </div>
                <label>
                    <div className='form-input'>Server Name <span className='required'>*</span>
                    <input className='create-input'
                        type="text"
                        placeholder='Server Name'
                        value={name}
                        onChange={changeName}
                        required
                        />
                        {imageLoading && <h4>Image loading...</h4>}
                    </div>
                </label>

                <label>
                    <div>
                        <div className='form-input-file'>Server Img</div>
                        <input className='create-input-file'
                            type="file"
                            accept='image/*'
                            onChange={changeImg}
                            />
                        </div>
                </label>
                {!errors.length && <button className='submit-server-button' type='submit' disabled={errors.length}>Create Server</button>}
            </form>
        </div>
        </>
    )
}

export default NewServerForm
