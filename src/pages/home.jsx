import stylesFile from '../styles/home.module.css'
import Button from '../components/Button'

export function Home(){
  return(
    <>
      <div className={stylesFile.container}>
          <p>Join or Create</p>
          <div className={stylesFile.center}>
            <p>Welcome <a href="/">User</a></p>
            <form action="">
                <input type="text" name="" id="" placeholder="Type chat code..."/>
                <Button style={styles.headerButton}>
                    arrow
                </Button>
            </form>
            <p>or</p>
            <Button style={styles.sendButton}>
                <p>CREATE CHAT</p>
            </Button>
          </div>
          <p><a href="/">Logout</a></p>
      </div>
    </>
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
