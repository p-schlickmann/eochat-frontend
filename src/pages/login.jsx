import Button from "../components/Button";
import stylesFile from "../styles/register.module.css";
import { useHistory } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import api, { setToken } from "../api";
import { login } from "../utils";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    useLayoutEffect(() => {
        const isLoggedIn = localStorage.getItem("token") !== null;
        if (isLoggedIn) history.push("/");
    }, []);

    const handleLogin = async () => {
        setError("");
        if (!username || !password) {
            return setError(
                "Please input your username and your password correctly."
            );
        }
        const response = await api
            .post("/token/", { username, password })
            .catch((e) => e.response);
        if (response.status.toString().startsWith("2")) {
            login(response.data.token, history, username);
        } else {
            const errorFromResponse = response.data.detail;
            setError(
                errorFromResponse
                    ? response.data.detail
                    : "We had a problem trying to log you in."
            );
        }
    };

    return (
        <div className={stylesFile.registerMainContainer}>
            <div className={stylesFile.tittleDiv}>
                <p>Login</p>
            </div>
            <div className={stylesFile.registerContainer}>
                <div className={stylesFile.form}>
                    <label className={stylesFile.textLabel}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className={stylesFile.input}
                        />
                    </label>
                    <label className={stylesFile.textLabel}>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className={stylesFile.input}
                        />
                    </label>

                    <Button style={styles.sendButton} onClick={handleLogin}>
                        LOGIN
                    </Button>
                    <span className={"errorMsg"}>{error}</span>
                </div>
            </div>
            <div className={stylesFile.bottomDiv}>
                <p className={stylesFile.text}>
                    Register{" "}
                    <a className={stylesFile.link} href={"/register"}>
                        here
                    </a>
                </p>
                <p className={stylesFile.text}>
                    Sponsor: Handpicked, remote only Django opportunities below!
                    <a className={stylesFile.link} href={"https://django.on-remote.com/"}>
                        Django On Remote
                    </a>
                </p>
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
        height: "50px",
        width: "100%",
        fontSize: "17px",
    },
};
