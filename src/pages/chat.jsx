import {useState} from "react";
import {useParams} from 'react-router-dom'

import useWebSocket from "react-use-websocket";


export function Chat(){
    const [message, setMessage] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState([])

    const {code} = useParams()

    const { lastJsonMessage, sendMessage } = useWebSocket(`ws://localhost:8000/ws/chat/${code}/`, {
        onOpen: () => {
            setIsConnected(true)
            console.log('onopen')
            sendMessage(JSON.stringify({type: "fetch_messages", page: 1}))
        },
        onMessage: (receivedMessage) => {
            const parsedMsg = JSON.parse(receivedMessage.data)
            if (parsedMsg.type === 'fetch_messages') {
                setMessages(parsedMsg.messages)
            } if (parsedMsg.type === 'new_message') {
                setMessages(prev => [...prev, parsedMsg.message])
            }
        },
        queryParams: { 'token': localStorage.getItem('token') },
        onError: (event) => {
            console.error('erro', event)
            setIsConnected(false)
        },
        shouldReconnect: (closeEvent) => {
            setIsConnected(false)
            return true
        },
        reconnectAttempts: 5,
        reconnectInterval: 3000
    });

    const displayMessages = () => {
        return messages.map((msg, idx) => {
            return <p key={idx}>{msg.author} | {msg.content} | {new Date(msg.created_at).toLocaleString()}</p>
        })
    }

    return(
        <>
            <h1>ola</h1>
            <p>{isConnected ? 'Connected' : 'Not connected' }</p>
            <div style={{backgroundColor: 'gray'}}>{displayMessages()}</div>
            <input onChange={(e) => setMessage(e.target.value)} value={message}/>
            <button onClick={() => sendMessage(JSON.stringify({type: "send_message", content: message}))}>send</button>
        </>
    );
}