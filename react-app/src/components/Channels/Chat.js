import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage, getAllMessages } from "../../store/message";
import Message from "./Message";
import './channels.css'
import { io } from 'socket.io-client';
let socket;

const Chat = ({channel}) => {
    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [errors, setErrors] = useState([])
    const [searhInput, setSearchInput] = useState('')
    const user = useSelector(state => state.session.user)
    const msgs = useSelector(state => state.message)
    console.log('over hereeeeeeeeeee', msgs)

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    useEffect(() => {
        let errArr = []
        if(chatInput.length > 1000)
            errArr.push('Message cannot exceed 1000 characters!')

        setErrors(errArr)
    }, [chatInput])

    useEffect(() => {
        if(!msgs) {
            return
        }

        else {
            let a = Object.values(msgs).filter(msg => msg.channel_id === Number(channelId))
            setMessages(a)
        }
    }, [msgs, channelId])

    useEffect(() => {
        dispatch(getAllMessages())
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })
    }, [dispatch, messages])

    const sendChat = async (e) => {
        e.preventDefault()
        if(errors.length){
            return
        }
        else {
            const data = {
                user_id: user.id,
                channel_id: channelId,
                body: chatInput
            }

            socket.emit("chat", { user: user.username, msg: chatInput, room: channelId });
            setChatInput("")

            await dispatch(createMessage(data))
        }
    }

    return (user && (
        <div>

            <div>
                {/* eslint-disable-next-line*/}
                {messages && messages.filter(message => {
                    if (searhInput === '')
                        return message

                    if (message.body.toLowerCase().includes(searhInput.toLowerCase()))
                        return message

                }).map((message, ind) => (
                    <>
                       <Message key={message.id} message={message} />
                    </>
                ))}
            </div>
            <form onSubmit={sendChat} disabled={errors.length}>
                <input className="chat-input"
                    value={chatInput}
                    onChange={updateChatInput}
                    placeholder={`Message #${channel.channel_name}`}
                />
                {errors &&
                    <div className="errors">{errors.map((error, i) => <div key={i}>{error}</div>)}</div>
                }
                {!user && <button type="submit" disabled={errors.length}>send</button>}
            </form>

            <div className="search">
                <input className='searchbox' placeholder='Search' onChange={e => setSearchInput(e.target.value)}/>
            </div>
        </div>
    )
    )
};


export default Chat;
