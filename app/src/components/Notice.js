import React from 'react'
import lock from '../assets/lock.png'

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
        cursor: 'pointer',
        fontSize: '14px'
    }
} 

function Notice() {
    return (
        <div style={styles.container}>
            <div>
                <img src={lock} alt="" height='18px'/>
            </div>
            <div style={styles.textContainer}>
                These documents are digitally signed and can not be modified once converted into a certificate. Click <span style={styles.link}>know more</span> to learn about WriteOnce Documents.
            </div>
        </div>
    )
}

export default Notice
