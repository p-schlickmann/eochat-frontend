import Button from "../components/Button";
import stylesFile from "../styles/register.module.css";
import { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import { login } from "../utils";

export function Register() {
    const [username, setUsername] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    useLayoutEffect(() => {
        const isLoggedIn = localStorage.getItem("token") !== null;
        if (isLoggedIn) history.push("/");
    }, []);

    const makeServerCall = async () => {
        const response = await api
            .post("/signup/", { username, password: pw1 })
            .catch((e) => e.response);
        if (response.status.toString().startsWith("2")) {
            login(response.data.token, history, username);
        } else {
            const errorFromResponse = response.data.detail;
            setError(
                errorFromResponse
                    ? response.data.detail
                    : "We had a problem trying to register you."
            );
        }
    };

    const handleRegister = (e) => {
        setError("");
        e.preventDefault();
        if (pw2 !== pw1) return setError("Passwords don't match");
        if (username.length < 8) return setError("Username is too small.");
        makeServerCall();
    };

    return (
        <div className={stylesFile.registerMainContainer}>
            <div className={stylesFile.tittleDiv}>
                <p>Register</p>
            </div>
            <div className={stylesFile.registerContainer}>
                <div className={stylesFile.form}>
                    <label className={stylesFile.textLabel}>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            id="RegisterUserName"
                            placeholder="Create a username"
                            className={stylesFile.input}
                        />
                    </label>
                    <label className={stylesFile.textLabel}>
                        <input
                            onChange={(e) => setPw1(e.target.value)}
                            value={pw1}
                            type="password"
                            placeholder="Create a password"
                            className={stylesFile.input}
                        />
                    </label>
                    <label className={stylesFile.textLabel}>
                        <input
                            onChange={(e) => setPw2(e.target.value)}
                            value={pw2}
                            type="password"
                            placeholder="Confirm password"
                            className={stylesFile.input}
                        />
                    </label>

                    <Button style={styles.sendButton} onClick={handleRegister}>
                        REGISTER
                    </Button>
                    <p className={"errorMsg"}>{error}</p>
                </div>
            </div>

            <div className={stylesFile.bottomDiv}>
                <p className={stylesFile.text}>
                    Go{" "}
                    <a className={stylesFile.link} href={"/"}>
                        home
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
