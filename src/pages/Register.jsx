import Button from "../components/Button";
import stylesFile from "../styles/register.module.css"


export function Register(){
    return(
        <div className={stylesFile.registerMainContainer}>

            <div className={stylesFile.tittleDiv}>
                <p>Register</p>
            </div>

           

            <div className={stylesFile.registerContainer}>
                <form>
                    <label className={stylesFile.textLabel}>
                        <input type="text" id='RegisterUserName' placeholder='Create a username' className={stylesFile.input}></input>
                    </label>
                    <label className={stylesFile.textLabel}>
                        <input type="password" id="RegisterPassword" placeholder='Create a password'></input>
                    </label>

                    <Button style={styles.sendButton}>REGISTER</Button>
                    
                </form>
            
            </div>
            
            <div className={stylesFile.bottomDiv}>
                <p className={stylesFile.text}>Go <a className={stylesFile.link}>back</a></p>
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