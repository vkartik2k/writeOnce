import React, { useEffect } from 'react'
import CertificateHeader from '../CertificateHeader'

const styles = {
    container: {
        backgroundColor: '#D4D4D4',
        paddingBottom: '10px'
    }
}

function DraftPage() {
    return (
        <div style={styles.container}>
            <CertificateHeader/>
            
        </div>
    )
}

export default DraftPage
