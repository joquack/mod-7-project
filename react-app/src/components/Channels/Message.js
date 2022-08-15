import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMessage, getAllMessages, updateMessage } from "../../store/message";
import './channels.css'

function Message({message}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const [chatInput, setChatInput] = useState(message.body);
    const [edit, setEdit] = useState(false)
    const {serverId, channelId} = useParams()
    console.log('OVER EHEREREEEEE', message)

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    const handleCancel = e => {
        setEdit(false)
    }

    const handleUpdateMessage = async e => {
        e.preventDefault()
        const data = {
            user_id: userId,
            channel_id: channelId,
            body: chatInput
        }

        const edittedMessage = await dispatch(updateMessage(data, message.id))

        if(edittedMessage){
            dispatch(getAllMessages())
            setEdit(false)
        }
    }

    const handleDeleteMessage = async e => {
        e.preventDefault()
        const deletedMessage = await dispatch(deleteMessage(message.id))

        if(deletedMessage){
            dispatch(getAllMessages())
            setEdit(false)
        }
    }

    return(
        <>
        {!edit &&
            <div>
                {`${message.users.username}: ${message.body}`}
            </div>}

        <div className="asdf">
            {edit &&
                <div>
                    <form>
                        <input className="chat-input" onChange={updateChatInput} value={chatInput}></input>
                        <button onClick={handleUpdateMessage}>Submit</button>
                        <button onClick={handleDeleteMessage}>Delete</button>
                    </form>

                </div>}

            {user && userId == message.user_id &&
                    <button className='cancel-edit' onClick={() => edit ? setEdit(false) : setEdit(true)}>Edit</button>}

        </div>

        </>
    )
}

export default Message