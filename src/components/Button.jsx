import styles from '../styles/Button.module.css'

const Button = ({children, style, onClick}) => (
    <button className={styles.button} style={style} onClick={onClick}>
        {children}
    </button>
)

export default Button