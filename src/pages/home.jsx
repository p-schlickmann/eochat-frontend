import stylesFile from "../styles/home.module.css";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import api, { removeToken } from "../api";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export function Home() {
    const [chatCode, setChatCode] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        removeToken();
        history.push("/login");
    };

    const handleChatJoin = async () => {
        setError("");
        const response = await api
            .get(`/chats/${chatCode}/exists`)
            .catch((e) => e.response);
        if (response.status === 200 && response.data.exists) {
            history.push(`/chat/${chatCode}`);
        } else {
            setError("This chat code is invalid.");
        }
    };

    return (
        <div className={stylesFile.container}>
            <p className={stylesFile.text}>Join or Create</p>

            <div className={stylesFile.center}>
                <p className={stylesFile.text}>
                    Welcome{" "}
                    <a href="/" className={stylesFile.link}>
                        {localStorage.getItem("username")}
                    </a>
                </p>
                <div className={stylesFile.form}>
                    <input
                        type="text"
                        value={chatCode}
                        onChange={(e) => setChatCode(e.target.value)}
                        placeholder="Type chat code..."
                        className={stylesFile.input}
                    />
                    <Button
                        onClick={handleChatJoin}
                        style={styles.headerButton}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </div>
                <p className={stylesFile.text}>or</p>
                <Button
                    onClick={() => history.push("/create-chat")}
                    style={styles.sendButton}
                >
                    <a>CREATE CHAT</a>
                </Button>
                <p className={"errorMsg"}>{error}</p>
            </div>
            <p className={stylesFile.text}>
                <a
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                    className={stylesFile.link}
                >
                    Logout
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
