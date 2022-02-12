import {useRef, useState} from "react";
import {useParams} from 'react-router-dom'

import useWebSocket from "react-use-websocket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from "../components/Button";
import stylesFile from '../styles/chat.module.css'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


export function Chat(){
    const [chatName, setChatName] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const messagesContainer = useRef()

    const {code} = useParams()

    const { lastJsonMessage, sendMessage } = useWebSocket(`ws://localhost:8000/ws/chat/${code}/`, {
        onOpen: () => {
            sendMessage(JSON.stringify({type: "fetch_messages", page: 1}))
        },
        onMessage: (receivedMessage) => {
            const parsedMsg = JSON.parse(receivedMessage.data)
            if (parsedMsg.type === 'fetch_messages') {
                setChatName(parsedMsg.chat_name)
                setMessages(parsedMsg.messages)
                setIsConnected(true)
            } if (parsedMsg.type === 'new_message') {
                setMessages(prev => [...prev, parsedMsg.message])
            }
            scrollToBottom()
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

    const scrollToBottom = () => {
        const container = messagesContainer.current
        container.scrollTo(0, container.scrollHeight)
    }

    const formatDate = (isoDate) => {
        if (!isoDate) return ''
        const dateObj = new Date(isoDate)
        let month = '' + (dateObj.getMonth() + 1)
        let day = '' + dateObj.getDate()
        let year = dateObj.getFullYear()
        let minutes = dateObj.getMinutes()
        let hour = dateObj.getHours()

        if (month.length < 2) {
            month = '0' + month
        }
        if (day.length < 2) {
            day = '0' + day
        }
        if (minutes === 0) {
            minutes = '0' + minutes
        }

        return `${hour}:${minutes} ${[day, month, year].join('/')}`
    }

    const displayMessages = () => {
        const loggedInUsername =  localStorage.getItem('username')
        return messages.map((msg, idx) => {
            const isOwner = loggedInUsername === msg.author

            return (
                <div key={idx} className={stylesFile.messageBox}>
                    {isOwner ? <div style={{width: '40%'}}/> : null}
                    <div className={'message'} style={
                        {
                            backgroundColor: isOwner ? 'var(--purple)' : 'var(--white)',
                            color: isOwner ? 'var(--white)' : 'var(--black)'
                        }}>
                        {isOwner ? null : <p className={'messageAuthor'}>{msg.author}</p>}
                        <span className={'messageContent'}>{msg.content}</span>
                        <p className={'messageDate'}>{formatDate(msg.created_at)}</p>
                    </div>
                    {isOwner ? null : <div style={{width: '40%'}}/>}
                </div>
            )
        })
    }

    const handleNewMessage = () => {
        sendMessage(JSON.stringify({type: "send_message", content: message}))
        setMessage('')
    }

    return(
        <div className={stylesFile.container}>
            <div>
                <a href={'/'}>
                    <Button style={styles.headerButton}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </Button>
                </a>

                <div className={stylesFile.headerText}>
                    <span className={stylesFile.mainHeader}>{isConnected ? chatName : 'Connecting...' }</span>
                    <span className={stylesFile.secondaryHeader}>#{code}</span>
                </div>
            </div>
            <div ref={messagesContainer} className={stylesFile.messagesContainer} style={{display: 'block'}}>
                {displayMessages()}
            </div>
            <div>
                <input placeholder={'Message...'} className={stylesFile.input}
                    onChange={(e) => setMessage(e.target.value)} value={message}/>
                <Button style={styles.sendButton}  onClick={handleNewMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
}

const styles = {
    headerButton: {
        width: '70px',
        height: '69px',
        marginRight: '15px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px'
    },
    sendButton: {
        height: '40px',
        width: '150px',
        fontSize: '17px',
        marginLeft: '15px'
    },
}