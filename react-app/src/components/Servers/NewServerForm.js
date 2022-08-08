import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createServer } from '../../store/server';

function NewServerForm (){
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

        const createdServer = await dispatch(createServer(data))
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
    }

    return (
        <>
        <h2>Create Server</h2>
        <form>
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
                    type="text"
                    placeholder='Server Name'
                    value={name}
                    onChange={changeName}
                    required
                    />
                </div>
            </label>
        </form>
        </>
    )
}

export default NewServerForm
