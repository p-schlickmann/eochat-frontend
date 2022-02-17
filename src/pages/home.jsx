import stylesFile from '../styles/home.module.css'
import Button from '../components/Button'

export function Home(){
  return(
    <>
      <h1>Home</h1>
        <div className={'container'}>
            aaa
        </div>
      <div className={stylesFile.container}>

          <p className={stylesFile.text}>Join or Create</p>

          <div className={stylesFile.center}>
            <p className={stylesFile.text}>Welcome <a href="/" className={stylesFile.link}>User</a></p>
            <form action="" className={stylesFile.form}>
                <input type="text" name="" id="" placeholder="Type chat code..." className={stylesFile.input}/>
                <Button style={styles.headerButton}>
                    arrow
                </Button>
            </form>
            <p className={stylesFile.text}>or</p>
            <Button style={styles.sendButton}>
                <p>CREATE CHAT</p>
            </Button>
          </div>
          <p className={stylesFile.text}><a href="/" className={stylesFile.link}>Logout</a></p>
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
