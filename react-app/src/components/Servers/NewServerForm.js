import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createServer, getAllServers } from '../../store/server';
import { getAllChannels, createChannel } from '../../store/channel';

const NewServerForm = ({setShowModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const [name, setName] = useState('')
    const [img, setImg] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    const changeName = e => setName(e.target.value)
    const changeImg = e => {
        const file = e.target.files[0];
        setImg(file);
    }

    const handleCreateServer = async e => {
        e.preventDefault()
        setImageLoading(true)
        setErrors([])

        const data = {
            user_id: userId,
            server_name: name,
            server_img: img
        }


        const createdServer = await dispatch(createServer(data))

        await dispatch(getAllServers())
        .catch(
            async(res) => {
                const validations = await res.json()

                if(validations && validations.errors)
                setErrors(validations.errors)
            }
        )
        if(createdServer){
            const defaultChannelData = {
                server_id: createdServer.id,
                channel_name: 'general',
                description: 'general chat'
            }

            const defaultChannel = await dispatch(createChannel(defaultChannelData))
            await dispatch(getAllChannels())
            .catch(
                async(res) => {
                    const validations = await res.json()

                    if(validations && validations.errors)
                    setErrors(validations.errors)
                }
            )
            
            if(createdServer && defaultChannel){
                console.log('OVER EHEREEEEEEEEEE', createdServer, defaultChannel)
                setShowModal(false)
                history.push(`/channels/${createdServer.id}/${defaultChannel.id}`)
            }
        }
    }

    return (
        <>
        <h2>Create Server</h2>
        <form onSubmit={handleCreateServer}>
            <div className='errors'>
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>
            <label>
                <div>Server Name
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
                <div>Server Img
                <input className='create-input'
                    type="file"
                    accept='image/*'
                    onChange={changeImg}
                    />
                </div>
            </label>
            <button type='submit'>Create Server</button>
        </form>
        </>
    )
}

export default NewServerForm
