import React from 'react'
import CertificateHeader from '../CertificateHeader'
import Doc from '../Doc'

const styles = {
    container: {
        backgroundColor: '#D4D4D4',
        paddingBottom: '10px'
    }
}

function DigitalCertificate() {
    return (
        <div style={styles.container}>
            <CertificateHeader/>
            <Doc/>
        </div>
    )
}

export default DigitalCertificate
