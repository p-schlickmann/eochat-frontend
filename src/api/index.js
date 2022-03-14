import axios from "axios";
import React from "react";

const getBackendUrl = () => {
    const isDev = "_self" in React.createElement("div");
    if (isDev) {
        return "http://localhost:8000";
    } else {
        return "https://protected-cove-50889.herokuapp.com/";
    }
};

export const getWebSocketUrl = (code) => {
    const isDev = "_self" in React.createElement("div");
    if (isDev) {
        return `ws://localhost:8000/ws/chat/${code}/`;
    } else {
        return "ws://protected-cove-50889.herokuapp.com/ws/chat/${code}/";
    }
};

const api = axios.create({
    baseURL: getBackendUrl(),
});

api.interceptors.request.use(function (config) {
    // resets token in case user hard refreshes the page
    const token = localStorage.getItem("token");
    config.headers.common["Authorization"] = token ? `Token ${token}` : "";
    return config;
});

export const setToken = (_token) => {
    // sets token on login
    api.defaults.headers.common["Authorization"] = `Token ${_token}`;
};

export const removeToken = () => {
    api.defaults.headers.common["Authorization"] = "";
};

export default api;
