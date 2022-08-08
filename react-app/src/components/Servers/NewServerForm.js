import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createServer } from '../../store/server';
import { getAllServers } from '../../store/server';

const NewServerForm = ({setShowModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [errors, setErrors] = useState([]);

    const changeName = e => setName(e.target.value)
    const changeImg = e => setImg(e.target.value)

    const handleCreateServer = async e => {
        e.preventDefault()
        // setErrors([])

        const data = {
            user_id: userId,
            server_name: name,
            server_img: img
        }

        const createdServer = await dispatch(createServer(data)).then(() => getAllServers())
        // .catch(
        //     async(res) => {
        //         const validations = await res.json()

        //         if(validations && validations.errors)
        //             setErrors(validations.errors)
        //     }
        // )
        if(createdServer){
            console.log('yooooooooo server created successfully, very epic')
        }
        else console.log('AHHHHHHHHHHHHHHHHHHHHHH aoihfiaugsfloagelfiuabsf')
    }

    return (
        <>
        <h2>Create Server</h2>
        <form onSubmit={handleCreateServer}>
            {/* <div className='errors'>
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div> */}
            <label>
                <div>Server Name
                <input className='create-input'
                    type="text"
                    placeholder='Server Name'
                    value={name}
                    onChange={changeName}
                    required
                    />
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
