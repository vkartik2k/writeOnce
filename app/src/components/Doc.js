import React from 'react'
import Notice from './Notice'

const styles = {
    page: {
        height: '1056px',
        width: '816px',
        backgroundColor: 'white',
        margin: 'auto',
        marginTop: '10px',
        boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.36)',
        padding: '70px',
        fontFamily: 'Courier New'
    },
    signature: {
        color: '#707070'
    }
}

function Doc() {
    return (
        <div style={styles.page}>
            <Notice/>
            <span style={styles.signature}>
                <br/>
                Created on: 17/07/2021 2:07pm<br/>
                Signed By: Kartik Verma (kartikv@gmail.com); Nikhil Sharma (sharma@gmail.com)<br/>
                <br/>
                Your unique certificate id is #23231580<br/>
                <br/>
                Digital Certificate by WriteOnce
                <br/>
                <br/>
            </span>

            <span>
                Hello this is a digital certificate created for checking purpose
                <br/>
                <br/>
                Kartik Verma,<br/>
                Co-founder,<br/>
                WriteOnce App
            </span>
        </div>
    )
}

export default Doc
