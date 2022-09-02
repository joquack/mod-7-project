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
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const {serverId, channelId} = useParams()
    const msgs = Object.values(useSelector(state => state.message)).filter(msg => msg.channels.server_id === Number(serverId))

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    useEffect(() => {
        dispatch(getAllMessages())
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendChat = async (e) => {
        e.preventDefault()
        const data = {
            user_id: user.id,
            channel_id: channelId,
            body: chatInput
        }

        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")

        const newMessage = await dispatch(createMessage(data))
        .then(() => dispatch(getAllMessages()))
    }

    return (user && (
        <div>
            <div>
                {msgs && msgs.map((message, ind) => (
                    <>
                       <Message key={message.id} message={message}/>
                    </>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input className="chat-input"
                    value={chatInput}
                    onChange={updateChatInput}
                    placeholder={`Message #${channel.channel_name}`}
                />
            </form>
        </div>
    )
    )
};


export default Chat;
