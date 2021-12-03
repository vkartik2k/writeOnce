import React from 'react'

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
        width: '20%'
    },
    userAvatar: {
        paddingRight: '20px',
        width: '20%',
        textAlign: 'right'
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
                <img src="user_avatar.png" alt="" height="35px" style={styles.round}/>
            </div>
        </div>
    )
}

export default CertificateHeader
