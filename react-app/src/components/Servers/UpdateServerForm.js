import React, { useState } from 'react'
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
    }

    const handleDeleteServer = e => {
        e.preventDefault()
        dispatch(deleteServer(id)).then(() => getAllServers())

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
                <div>Server Img
                    <input className='create-input'
                        type="file"
                        accept='image/*'
                        onChange={changeImg}
                    />
                </div>
            </label>
            <button type='submit'>Update Server</button>
            <button onClick={handleDeleteServer}>Delete Server</button>
        </form>
        </>
    )
}

export default UpdateServerForm
