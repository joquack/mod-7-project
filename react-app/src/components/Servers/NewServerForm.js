import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        let errArr = []
        if(name.length === 0)
            errArr.push('Name cannot be empty')

        if(name.length > 255)
            errArr.push('Name cannot be more than 255')

        if(img && !((/\.(gif|jpe?g|pdf|png|)$/i).test(img.name)))
            errArr.push('Not a valid file type')

        setErrors(errArr)
    }, [name, img])

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
