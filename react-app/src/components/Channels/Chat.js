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
    const msgs = useSelector(state => state.message)

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }



    useEffect(() => {
        if(!msgs) {
            return
        }

        else {
            let a = Object.values(msgs).filter(msg => msg.channels.server_id === Number(serverId))
            console.log('HEREEEEE', a)
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
    }, [])

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

    console.log('OVER HEREEEEEEEEEEEEEEEEEEEE', messages)

    return (user && (
        <div>
            <div>
                {messages && messages.map((message, ind) => (
                    <>
                       <Message key={message.id} message={message} />
                       {/* <div>
                        {message}
                       </div> */}
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
