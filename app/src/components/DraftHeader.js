import React, {useContext} from 'react'
import { LoginContext, UserContext } from '../App'
import GoogleLogin from './GoogleLogin';
import logo from '../assets/logo.png'
import logo_extended from '../assets/logo_extended.svg'
import { Link } from 'react-router-dom';
import './DraftHeader.css'

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
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
    },
    btn: {
        display: 'inline-block',
        marginLeft: '10px',
        cursor: 'pointer',
        padding: '5px',
        border: '2px solid black',
        borderRadius: '7px',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '18px',
    },
}

function DraftHeader({title, changeTitle, saveChanges}) {
    const user = useContext(UserContext);
    const loginMethod = useContext(LoginContext); 

    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <img src={logo} alt="Hey" height="45px"/>&nbsp;&nbsp;
                    <img src={logo_extended} alt="" height="45px"/>
                </Link>
            </div>
            <div style={styles.title}>
                <input 
                    placeholder="Add title here"
                    value={title}
                    onChange={(e) => {
                        changeTitle(e.target.value)
                    }}
                    className="titleInput"
                />
            </div>
            <div style={styles.userAvatar}>
                <div style={styles.btn} onClick={saveChanges}>Save Changes</div>

                <GoogleLogin user={user} logIn={loginMethod.logIn} logOut={loginMethod.logOut}/>    
            </div>
        </div>
    )
}

export default DraftHeader
