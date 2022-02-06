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
            fetchMessages(sendMessage, 1)
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
            console.log('should reconnect', closeEvent);
            setIsConnected(false)
            return true
        },
        reconnectInterval: 3000
    });

    const fetchMessages = (sendMessageFunc, page) => {
        sendMessageFunc(JSON.stringify({type: "fetch_messages", page: page}))
    }

    const displayMessages = () => {
        return messages.map((msg) => {
            return <p>{msg.author} | {msg.content} | {msg.created_at}</p>
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