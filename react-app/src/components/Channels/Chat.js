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
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.session.user)
    const msgs = useSelector(state => state.message)


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    useEffect(() => {
        let errArr = []
        if(chatInput.length > 4000)
            errArr.push('Message cannot exceed 4000 characters!')
    }, [chatInput])

    useEffect(() => {
        if(!msgs) {
            return
        }

        else {
            let a = Object.values(msgs).filter(msg => msg.channels.server_id === Number(serverId))
            setMessages(a)
        }
    }, [msgs])

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
        const data = {
            user_id: user.id,
            channel_id: channelId,
            body: chatInput
        }

        socket.emit("chat", { user: user.username, msg: chatInput, room: channelId });
        setChatInput("")

        const newMessage = await dispatch(createMessage(data))
    }

    console.log('OVER HEREEEEEEEEEEEEEEEEEEEE', msgs)

    return (user && (
        <div>
            <div>
                {messages && messages.map((message, ind) => (
                    <>
                       <Message key={message.id} message={message} />
                    </>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input className="chat-input"
                    value={chatInput}
                    onChange={updateChatInput}
                    placeholder={`Message #${channel.channel_name}`}
                />
                <div>errors will go here</div>
            </form>
        </div>
    )
    )
};


export default Chat;
