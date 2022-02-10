import '../styles/register.css'

export function Register(){
    return(
        <div className='container'>

            <h1>Register</h1>

            <div className='register-container'>
                <form>
                    <label className='TextLabel'>
                        <input type="text" id='RegisterUserName' placeholder='Create a username'></input><br></br>
                    </label>  
                    <label className='TextLabel'>
                        <input type="text" id="RegisterPassword" placeholder='Create a password'></input><br></br>
                    </label>

                    <button type='submit' >REGISTER</button>
                </form> 
            </div>
        </div>
    );
}