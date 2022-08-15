import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage, getAllMessages } from "../../store/message";

import { io } from 'socket.io-client';
let socket;

const Chat = () => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const {serverId, channelId} = useParams()
    const msgs = Object.values(useSelector(state => state.message)).filter(msg => msg.channels.server_id === Number(serverId))

    useEffect(() => {
        // open socket connection
        // create websocket
        dispatch(getAllMessages())
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async (e) => {
        e.preventDefault()
        const data = {
            user_id: user.id,
            channel_id: channelId,
            body: chatInput
        }
        const newMessage = await dispatch(createMessage(data))

        if(newMessage){
            socket.emit("chat", { user: user.username, msg: chatInput });
        }
        setChatInput("")
    }

    return (user && (
        <div>
            <div>
                {msgs && msgs.map((message, ind) => (

                    <div key={ind}>{`${message.users.username}: ${message.body}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
