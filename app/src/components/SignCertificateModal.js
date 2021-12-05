import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';
import { UserContext } from '../App';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase-config'

const styles = {
    linkContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '10px'
    },
    text: {
        fontSize: '20px',
        paddingRight: '10px'
    },
    inputContainer: {
        flex: '1'
    },
    input: {
        width: '100%'
    },
    btnContainer: {
        paddingLeft: '10px',
        width: '110px',
        textAlign: 'center'
    },
    btn: {
        padding: '10px',
        minWidth: '100px'
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        padding:'5px',
        textAlign:'left'
    },
    email: {
        flex: 1
    },
    bold: {
        fontWeight: '600'
    }
}

function SignCertificateModal({id, data, setData}) {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const user = useContext(UserContext);

    useEffect(() => {
        setUrl(window.location.href)
    }, [])

    const updateEmail = () => {
        setIsLoading(true)
        const docRef = doc(db, 'drafts', id);
        let copyData = data;
        copyData.signedBy.push({
            isSigned: false,
            email: email
        })

        setData(data)
        setDoc(docRef, data).then(() => {
            console.log('Changes saved!')
            setIsLoading(false)
        })
    }

    const updateIsSigned = () => {
        setIsLoading(true)
        const docRef = doc(db, 'drafts', id);
        let copyData = data;
        copyData.signedBy.forEach((element, i) => {
            if(element.email===user.email) copyData.signedBy[i].isSigned = true
        })

        setData(data)
        setDoc(docRef, data).then(() => {
            console.log('Changes saved!')
            setIsLoading(false)
        })
    }

    return (
        <>
            <div >
                Note: This is an irreversible action. Once converted into a digital certificate, the document is immutable. 
            </div>
            <br/>
            <div style={styles.linkContainer}>
                <div style={styles.inputContainer}><TextField style={styles.input} label="Link" variant="filled" value={url}/></div>
            </div>
            <div>

            </div>
            <div style={styles.linkContainer}>
                <div style={styles.text}>Get Signature</div>
                <div style={styles.inputContainer}><TextField style={styles.input} label="E-mail" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                <div style={styles.btnContainer}><Button style={styles.btn} variant="contained" onClick={updateEmail}>Add</Button></div>
            </div>
            {console.log(data)}
            {
                data.signedBy.map((obj) => {
                    if(obj.email===user.email) {
                        return (<div style={styles.flex}>
                            <div style={styles.text}><Avatar>{obj.email[0]}</Avatar></div>
                            <div style={styles.email}><span style={styles.bold}>{obj.email}</span></div>
                            <div style={styles.btnContainer}>{obj.isSigned?("Authorized"):(<Button style={styles.btn} variant="contained" onClick={updateIsSigned}>Sign</Button>)}</div>
                        </div>)
                    }
                    else {
                        return (<div style={styles.flex}>
                            <div style={styles.text}><Avatar>{obj.email[0]}</Avatar></div>
                            <div style={styles.email}><span style={styles.bold}>{obj.email}</span></div>
                            <div style={styles.btnContainer}>{obj.isSigned?("Authorized"):("Pending")}</div>
                        </div>)
                    }
                })
            }
            
            <Button style={styles.btn} variant="contained">Convert into certificate</Button>
        </>
    )
}

export default SignCertificateModal
