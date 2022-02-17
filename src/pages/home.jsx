import stylesFile from '../styles/home.module.css'
import Button from '../components/Button'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export function Home(){
  return(
      <div className={stylesFile.container}>
          <p className={stylesFile.text}>Join or Create</p>

          <div className={stylesFile.center}>
            <p className={stylesFile.text}>Welcome <a href="/" className={stylesFile.link}>User</a></p>
            <div className={stylesFile.form}>
                <input type="text" name="" id="" placeholder="Type chat code..." className={stylesFile.input}/>
                <Button style={styles.headerButton}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </Button>
            </div>
            <p className={stylesFile.text}>or</p>
            <Button style={styles.sendButton}>
                <a href={'/create-chat'}>CREATE CHAT</a>
            </Button>
          </div>
          <p className={stylesFile.text}><a href="/" className={stylesFile.link}>Logout</a></p>
      </div>
  );
}

const styles = {
    headerButton: {
        width: '70px',
        height: '50px',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
        backgroundColor:'var(--purple-dark)',
    },
    sendButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '100%',
        fontSize: '17px',
        backgroundColor:'var(--purple-dark)',
    },
}
