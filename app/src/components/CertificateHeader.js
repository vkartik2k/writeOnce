import React, {useContext} from 'react'
import { LoginContext, UserContext } from '../App'
import GoogleLogin from './GoogleLogin';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
        position: 'sticky',
        top: '0px',
        width: '100%',
        zIndex: '100'
    },
    logo: {
        paddingLeft: '20px',
        paddingTop: '8px',
        paddingBottom: '5px',
        width: '30%'
    },
    userAvatar: {
        paddingRight: '20px',
        width: '30%',
        textAlign: 'right',
        display:'flex',
        justifyContent: 'right'
    },
    round: {
        borderRadius : '50%'
    },
    title: {
        fontSize: '22px',
        fontWeight: '600'
    }
}

function CertificateHeader() {
    const user = useContext(UserContext);
    const loginMethod = useContext(LoginContext); 

    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <img src="logo.png" alt="" height="45px"/>&nbsp;&nbsp;
                <img src="logo_extended.svg" alt="" height="45px"/>
            </div>
            <div style={styles.title}>
                Share Holder Certificate
            </div>
            <div style={styles.userAvatar}>
                <GoogleLogin user={user} logIn={loginMethod.logIn} logOut={loginMethod.logOut}/>    
            </div>
        </div>
    )
}

export default CertificateHeader
