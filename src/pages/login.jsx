import Button from "../components/Button";
import stylesFile from "../styles/register.module.css"
import {useHistory} from "react-router-dom";
import {useLayoutEffect} from "react";


export function Login(){

    const history = useHistory()

    useLayoutEffect(() => {
        const isLoggedIn = localStorage.getItem('token') !== null
        if (isLoggedIn) history.push('/')
    }, [])

    const handleLogin = () => {
        // to be implemented
    }

    return(
        <div className={stylesFile.registerMainContainer}>
            <div className={stylesFile.tittleDiv}>
                <p>Login</p>
            </div>
            <div className={stylesFile.registerContainer}>
                <div className={stylesFile.form}>
                    <label className={stylesFile.textLabel}>
                        <input type="text" placeholder='Username' className={stylesFile.input}/>
                    </label>
                    <label className={stylesFile.textLabel}>
                        <input type="password" placeholder='Password' className={stylesFile.input}/>
                    </label>

                        <Button style={styles.sendButton} onClick={handleLogin}>LOGIN</Button>
                </div>
            </div>
            
            <div className={stylesFile.bottomDiv}>
                <p className={stylesFile.text}>Register <a className={stylesFile.link} href={'/register'}>here</a></p>
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
        height: '50px',
        width: '100%',
        fontSize: '17px',
    },
}