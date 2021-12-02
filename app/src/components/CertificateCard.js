import React, { useState } from 'react'

const styles = {
    container: {
        border: '#AEAEAE 1px solid',
        borderRadius: '20px',
        height: '220px',
        width: '190px',
        margin: '10px',
        cursor: 'pointer',
    },
    containerHovered: {
        boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.15)',
    },
    upper: {
        height: '66%',
        padding: '25px',
        textAlign: 'justify',
        fontSize: '13px'
    },
    lower: {
        borderTop: '#AEAEAE 1px solid',
        height: '34%',
        backgroundColor: '#F5F5F5',
        borderRadius: '0px 0px 20px 20px',
        display: 'flex',
        alignItems: 'center',
        paddingRight: '12px',
        fontSize: '15px'
    },
    imgContainer : {
        padding: '12px'
    },
    titleText : {
        fontWeight: '600'
    },
    timestamp : {
        fontWeight: '400',
        color: '#4E4E4E',
        fontSize: '12px'
    }
}

function CertificateCard(props) {
    const [hover, setHover] = useState(false)

    return (
        <div 
            style={{...styles.container, ...(hover? styles.containerHovered: {})}}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >
            <div style={styles.upper}>
                Hello world, the text from the certificate will come out over here
            </div>
            <div style={styles.lower}>
                <div style={styles.imgContainer}>
                    <img src="certificate.svg" alt="" height="28px"/>
                </div>
                <div>
                    <div style={styles.titleText}>Share Holder Certificate
                    </div>
                    <div style={styles.timestamp}>22/07/2021 21:03pm</div>
                </div>
            </div>
        </div>
    )
}

export default CertificateCard
