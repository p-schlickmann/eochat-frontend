import stylesFile from "../styles/home.module.css";
import Button from "../components/Button";
import { useState } from "react";
import api from "../api";
import { useHistory } from "react-router-dom";

export function CreateChat() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    const handleChatCreation = async () => {
        setError("");
        const response = await api
            .post("/chats/", { name })
            .catch((e) => e.response);
        if (response.status.toString().startsWith("2")) {
            history.push(`/chat/${response.data.code}`);
        } else {
            const errorFromResponse = response.data.detail;
            setError(
                errorFromResponse
                    ? response.data.detail
                    : "We had a problem trying to join this chat."
            );
        }
    };
    return (
        <div className={stylesFile.container}>
            <p className={stylesFile.text}>Create chat</p>

            <div className={stylesFile.center}>
                <div className={stylesFile.form}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Chat name"
                        className={stylesFile.input}
                        style={{
                            borderRadius: "10px",
                            width: "200px",
                            marginBottom: "10px",
                        }}
                    />
                </div>
                <Button style={styles.sendButton} onClick={handleChatCreation}>
                    <p>CREATE</p>
                </Button>
                <p className={"errorMsg"}>{error}</p>
            </div>
            <p className={stylesFile.text}>
                <a href="/" className={stylesFile.link}>
                    Home
                </a>
            </p>
        </div>
    );
}

const styles = {
    headerButton: {
        width: "70px",
        height: "50px",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        backgroundColor: "var(--purple-dark)",
    },
    sendButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        width: "100%",
        fontSize: "17px",
        backgroundColor: "var(--purple-dark)",
    },
};
