import { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import useWebSocket from "react-use-websocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../components/Button";
import stylesFile from "../styles/chat.module.css";
import {
    faArrowLeft,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api";

export function Chat() {
    const [chatName, setChatName] = useState("");
    const [newChatName, setNewChatName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const messagesContainer = useRef();
    const history = useHistory();

    const { code } = useParams();

    const { lastJsonMessage, sendMessage } = useWebSocket(
        `ws://localhost:8000/ws/chat/${code}/`,
        {
            onOpen: () => {
                sendMessage(
                    JSON.stringify({ type: "fetch_messages", page: 1 })
                );
            },
            onMessage: (receivedMessage) => {
                setError("");
                const parsedMsg = JSON.parse(receivedMessage.data);
                if (parsedMsg.type === "fetch_messages") {
                    setChatName(parsedMsg.chat_name);
                    setMessages(parsedMsg.messages);
                    setIsConnected(true);
                }
                if (parsedMsg.type === "new_message") {
                    setMessages((prev) => [...prev, parsedMsg.message]);
                }
                scrollToBottom();
            },
            queryParams: { token: localStorage.getItem("token") },
            onError: (event) => {
                console.error("erro", event);
                setIsConnected(false);
            },
            shouldReconnect: (closeEvent) => {
                setIsConnected(false);
                return true;
            },
            reconnectAttempts: 5,
            reconnectInterval: 3000,
        }
    );

    const scrollToBottom = () => {
        const container = messagesContainer.current;
        container.scrollTo(0, container.scrollHeight);
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const dateObj = new Date(isoDate);
        let month = "" + (dateObj.getMonth() + 1);
        let day = "" + dateObj.getDate();
        let year = dateObj.getFullYear();
        let minutes = dateObj.getMinutes();
        let hour = dateObj.getHours();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }
        if (minutes.toString().length < 2) {
            minutes = "0" + minutes;
        }

        return `${[day, month, year].join("/")} ${hour}:${minutes} `;
    };

    const displayMessages = () => {
        const loggedInUsername = localStorage.getItem("username");
        return messages.map((msg, idx) => {
            const isOwner = loggedInUsername === msg.author;

            return (
                <div key={idx} className={stylesFile.messageBox}>
                    {isOwner ? <div style={{ width: "40%" }} /> : null}
                    <div
                        className={stylesFile.message}
                        style={{
                            backgroundColor: isOwner
                                ? "var(--purple)"
                                : "var(--white)",
                            color: isOwner ? "var(--white)" : "var(--black)",
                        }}
                    >
                        {isOwner ? null : (
                            <p className={stylesFile.messageAuthor}>
                                {msg.author}
                            </p>
                        )}
                        <span className={stylesFile.messageContent}>
                            {msg.content}
                        </span>
                        <p className={stylesFile.messageDate}>
                            {formatDate(msg.created_at)}
                        </p>
                    </div>
                    {isOwner ? null : <div style={{ width: "40%" }} />}
                </div>
            );
        });
    };

    const handleNewMessage = () => {
        sendMessage(JSON.stringify({ type: "send_message", content: message }));
        setMessage("");
    };

    const deleteChat = async () => {
        setError("");
        const response = await api
            .delete(`/chats/${code}/`)
            .catch((e) => e.response);
        if (response.status === 204) {
            history.push("/");
        } else {
            setError("Error trying to delete this chat.");
        }
    };

    const editChat = async () => {
        setError("");
        const response = await api
            .post(`/chats/${code}/change`, { name: newChatName })
            .catch((e) => e.response);
        if (response.status === 200) {
            setChatName(response.data.name);
        } else {
            setError("Error at editing the chat name.");
        }
        setIsEditing(false);
    };

    return (
        <div className={stylesFile.container}>
            <div>
                <a href={"/"}>
                    <Button style={styles.headerButton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </a>

                <div className={stylesFile.headerText}>
                    <span className={stylesFile.mainHeader}>
                        {isConnected ? (
                            isEditing ? (
                                <>
                                    <input
                                        value={newChatName}
                                        onChange={(e) =>
                                            setNewChatName(e.target.value)
                                        }
                                    />
                                    <button onClick={editChat}>
                                        Confirmar
                                    </button>
                                </>
                            ) : (
                                chatName
                            )
                        ) : (
                            "Connecting..."
                        )}
                    </span>
                    <span className={stylesFile.secondaryHeader}>#{code}</span>
                    <Button onClick={deleteChat} style={{ marginLeft: "10px" }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    {isEditing ? null : (
                        <Button
                            onClick={() => {
                                setIsEditing(true);
                                setNewChatName(chatName);
                            }}
                            style={{ marginLeft: "5px" }}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    )}
                </div>
            </div>
            <span className={"errorMsg"}>{error}</span>

            <div
                ref={messagesContainer}
                className={stylesFile.messagesContainer}
                style={{ display: "block", height: "100%", marginTop: "10px" }}
            >
                {displayMessages()}
            </div>
            <div>
                <input
                    placeholder={"Message..."}
                    className={stylesFile.input}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <Button style={styles.sendButton} onClick={handleNewMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
}

const styles = {
    headerButton: {
        width: "70px",
        height: "69px",
        marginRight: "15px",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
    },
    sendButton: {
        height: "40px",
        width: "150px",
        fontSize: "17px",
        marginLeft: "15px",
    },
};
