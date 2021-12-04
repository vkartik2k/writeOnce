import React, {useContext} from 'react'
import { LoginContext, UserContext } from '../../App'
import GoogleLogin from '../GoogleLogin'

function LandingPage() {
    const user = useContext(UserContext);
    const loginMethod = useContext(LoginContext); 

    return (
        <div>
            <GoogleLogin user={user} logIn={loginMethod.logIn} logOut={loginMethod.logOut}/>
        </div>
    )
}

export default LandingPage
