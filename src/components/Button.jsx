import '../styles/Button.css'

const Button = ({children, style, onClick}) => (
    <button className={'button'} style={style} onClick={onClick}>
        {children}
    </button>
)

export default Button