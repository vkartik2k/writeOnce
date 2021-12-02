import React from 'react'

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    textContainer: {
        paddingLeft: '10px',
        maxWidth: '600px',
        fontSize: '14px'
    },
    link: {
        color: '#006BCD',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
} 

function Notice() {
    return (
        <div style={styles.container}>
            <div>
                <img src="lock.png" alt="" height='18px'/>
            </div>
            <div style={styles.textContainer}>
                The documents are end-to-end encrypted and can not be modified once converted into a certificate. Click <span style={styles.link}>know more</span> to learn about WriteOnce Documents.
            </div>
        </div>
    )
}

export default Notice
