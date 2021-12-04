import React, { useContext } from 'react'
import { LoginContext, UserContext } from '../App'
import GoogleLogin from './GoogleLogin'
import logo from '../assets/logo.png'
import logo_extended from '../assets/logo_extended.svg'

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
        position: 'sticky',
        top: '0px',
        width: '100%'
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
    search : {
        border: '0px',
        padding: '10px',
        fontSize: '19px',
        minWidth: '500px',
        borderRadius: '10px',
        paddingLeft: '50px',
        marginLeft: '-20px',
        backgroundColor: 'white',
    },
    searchImg: {
        position: 'relative',
        left:'13px'
    }
}

function MainHeader() {
    const user = useContext(UserContext);
    const loginMethod = useContext(LoginContext); 

    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <img src={logo} alt="" height="45px"/>&nbsp;&nbsp;
                <img src={logo_extended} alt="" height="45px"/>
            </div>
            <div>
                <img src="search.png" alt="" width='15px' style={styles.searchImg}/>
                <input 
                    style={styles.search}
                    placeholder="Search"
                />
            </div>
            <div style={styles.userAvatar}>
                <GoogleLogin user={user} logIn={loginMethod.logIn} logOut={loginMethod.logOut}/>
            </div>
        </div>
    )
}

export default MainHeader
