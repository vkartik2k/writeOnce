import React, {useContext} from 'react'
import { LoginContext, UserContext } from '../App'
import GoogleLogin from './GoogleLogin';
import logo from '../assets/logo.png'
import logo_extended from '../assets/logo_extended.svg'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: '0px',
        width: '100%',
        zIndex: '90',
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

function Header({title, changeTitle}) {
    const user = useContext(UserContext);
    const loginMethod = useContext(LoginContext); 
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <img src={logo} alt="Hey" height="45px"/>&nbsp;&nbsp;
                    <img src={logo_extended} alt="" height="45px"/>
                </Link>
            </div>
            <div style={styles.title}>
                
            </div>
            <div style={styles.userAvatar}>
                {user&&<Button variant="contained" onClick={() => navigate('/dashboard')}>Dashboard</Button>}
                &nbsp;&nbsp;
                <GoogleLogin user={user} logIn={() => {
                    loginMethod.logIn()
                }} logOut={loginMethod.logOut}/>    
            </div>
        </div>
    )
}

export default Header
