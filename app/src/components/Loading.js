import React from 'react'
import './Loading.css'
import logo from '../assets/logo.png'

const styles = {
    container: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        zIndex: '100'
    },
    loading: {
        width: '200px',
        textAlign: 'center',
        margin: 'auto',
        marginTop: '200px'
    }
}

function Loading() {
    return (
        <div style={styles.container}>
            <div style={styles.loading}>
                <img src={logo} alt="logo" height="120px"/>
                <div className='line'>
                    <div className="inner"></div>
                </div>
            </div>
            
        </div>
    )
}

export default Loading
