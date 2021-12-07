import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import CertificateHeader from '../CertificateHeader'
import { db } from '../../firebase-config'
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import Doc from '../Doc'
import Loading from '../Loading'

const styles = {
    container: {
        backgroundColor: '#D4D4D4',
        paddingBottom: '10px'
    }
}

function DigitalCertificate(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [certificateData, setCertificateData] = useState({});
    const params = useParams();

    useEffect(() => {
        setIsLoading(true)
        const docRef = doc(db, 'certificates', params.id);

        getDoc(docRef).then(snap => {
            if(snap.exists()) {
                setCertificateData(snap.data());
                setIsLoading(false);
            }
        })

    }, [])

    return (
        <div style={styles.container}>
            {isLoading && <Loading/>}
            <CertificateHeader title={certificateData.title}/>
            <Doc html={certificateData.text}/>
        </div>
    )
}

export default DigitalCertificate
