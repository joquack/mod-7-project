import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMessage, getAllMessages, updateMessage } from "../../store/message";
import './channels.css'

function Message({message}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [chatInput, setChatInput] = useState(message.body);
    const [edit, setEdit] = useState(false)
    const [errors, setErrors] = useState([])
    const {channelId} = useParams()

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    useEffect(() => {
        let errArr = []
        if(chatInput.length > 1000)
            errArr.push('Message cannot exceed 1000 characters!')

        setErrors(errArr)
    }, [chatInput])

    const handleUpdateMessage = async e => {
        e.preventDefault()
        if(errors.length) {
            return
        }

        else {
            const data = {
                user_id: user.id,
                channel_id: channelId,
                body: chatInput
            }

            await dispatch(updateMessage(data, message.id))
            .then(() => dispatch(getAllMessages()))
            setEdit(false)
        }

    }

    const handleDeleteMessage = async e => {
        e.preventDefault()
        await dispatch(deleteMessage(message.id))
        .then(() => dispatch(getAllMessages()))
    }

    return(
        <>
        <div className="user-message">
            <div>
                <img className="user-avatar" src="https://archive.org/download/discordprofilepictures/discordblue.png" alt='user-avatar'></img>
            </div>

            <div className="message-stuff">
                <div>
                    {!edit &&
                        <div className="message-content">
                            {` ${message.users.username}: ${message.body}`}
                        </div>}
                </div>

                <div className="edit-delete-message">
                    {edit &&
                        <div>
                            <form>
                                <input className="edit-chat-input" onChange={updateChatInput} value={chatInput}></input>
                                {errors &&
                                    <div className="errors">{errors.map((error, i) => <div key={i}>{error}</div>)}</div>
                                }
                                <div className="delete-save">
                                    <button className="message-save" onClick={handleUpdateMessage}>Save</button>
                                    <button className="message-delete" onClick={handleDeleteMessage}>Delete</button>
                                </div>
                            </form>
                        </div>}

                    {user.id === message.user_id && !edit &&
                            <button className='cancel-edit' onClick={() => edit ? setEdit(false) : setEdit(true)}>Edit</button>}

                    {user.id === message.user_id && edit &&
                        <button className='cancel-edit' onClick={() => edit ? setEdit(false) : setEdit(true)}>Cancel</button>}
                </div>
            </div>
        </div>

        </>
    )
}

export default Message
