import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getAllChannels, createChannel } from '../../store/channel';

const NewChannelForm = ({setShowModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {serverId} = useParams()

    const [name, setName] = useState('')
    const [channelDescription, setChannelDescription] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errArr = []
        if(name.length === 0)
            errArr.push('Name cannot be empty')

        if(name.length > 255)
            errArr.push('Name cannot be more than 255')

        if(channelDescription.length > 255)
            errArr.push('Name cannot be more than 255')

        setErrors(errArr)
    }, [name, channelDescription])

    const changeName = e => setName(e.target.value)
    const changeDescription = e => setChannelDescription(e.target.value)

    const handleCreateChannel = async e => {
        e.preventDefault()
        setErrors([])

        const data = {
            server_id: serverId,
            channel_name: name,
            description: channelDescription
        }

        const createdChannel = await dispatch(createChannel(data))
        await dispatch(getAllChannels())

        if(createdChannel){
            setShowModal(false)
            history.push(`/channels/${serverId}/${createChannel.id}`)
        }
    }

    return (
        <>
        <div className='create-server'>
            <div className='create-server-customize'>
                <div className='create-server-big'>Create Channel</div>
            </div>
            <form onSubmit={handleCreateChannel}>
                <div className='errors'>
                    <ul>
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </div>
                <label>
                    <div className='form-input'>Channel Name <span className='required'>*</span>
                    <input className='create-input'
                        type="text"
                        placeholder='Channel Name'
                        value={name}
                        onChange={changeName}
                        required
                        />
                        {/* {imageLoading && <h4>Image loading...</h4>} */}
                    </div>
                </label>

                <label>
                    <div>
                        <div className='form-input-file'>Channel Description</div>
                        <input className='create-input'
                        type="text"
                        placeholder='Channel Name'
                        value={channelDescription}
                        onChange={changeDescription}
                        required
                        />
                    </div>
                </label>
                {!errors.length && <button className='submit-server-button' type='submit' disabled={errors.length}>Add New Channel</button>}
            </form>
        </div>
        </>
    )
}

export default NewChannelForm
