import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateServer, getAllServers, deleteServer } from '../../store/server';

const UpdateServerForm = ({ setShowModal, id }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const [name, setName] = useState('')
    const [img, setImg] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const changeName = e => setName(e.target.value)
    const changeImg = e => setImg(e.target.files[0])

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

    const handleupdateServer = async e => {
        e.preventDefault()
        setImageLoading(true)
        setErrors([])

        const data = {
            user_id: userId,
            server_name: name,
            server_img: img
        }

        const updatedServer = await dispatch(updateServer(data, id))
            .then(() => getAllServers())
            .catch(
                async (res) => {
                    const validations = await res.json()

                    if (validations && validations.errors)
                        setErrors(validations.errors)
                }
            )
        if(updatedServer){
            setShowModal(false)
        }
    }

    const handleDeleteServer = async e => {
        e.preventDefault()
        await dispatch(deleteServer(id))
        history.push('/channels/me')
        setShowModal(false)
    }

    return (
        <>
        <h2>Update Server</h2>
        <form onSubmit={handleupdateServer}>
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
                    <div>
                        <div className='form-input-file'>Server Img</div>
                        <input className='create-input-file'
                            type="file"
                            accept='image/*'
                            onChange={changeImg}
                        />
                    </div>
            </label>
            <button className='update-server' type='submit' disabled={errors.length}>Update Server</button>
            <button className='delete-server' onClick={handleDeleteServer}>Delete Server</button>
        </form>
        </>
    )
}

export default UpdateServerForm
