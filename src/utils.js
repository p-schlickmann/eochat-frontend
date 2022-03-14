import { setToken } from "./api";

export const login = (token, history, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setToken(token);
    history.push("/");
};
