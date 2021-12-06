import React, { useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';
import { UserContext } from '../App';
import { doc, addDoc, getDoc, setDoc, query, where, collection, getDocs, deleteDoc} from "firebase/firestore"; 
import { db } from '../firebase-config'
import { useNavigate } from 'react-router';

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

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) 
  });
  return response.json();
}

function SignCertificateModal({id, data, setData, access}) {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setUrl(window.location.href)
    }, [])

    const updateEmail = () => {
        setIsLoading(true)
        let flag = true
        data.signedBy.forEach(element => {
            if(element.id===email) flag = false;
        })
        if(flag) {
            const docRef = doc(db, 'drafts', id);
            let copyData = data;
            copyData.signedBy.push({
                isSigned: false,
                email: email
            })
    
            setData(data)
            setDoc(docRef, data).then(() => {
                const profiles = collection(db, "profiles");
                const q = query(profiles, where("email", "==", email))
                getDocs(q).then(snaps => {
                    snaps.forEach(snap => {
                        let copyData = snap.data()
                        copyData.sharedDrafts.push(doc(db, 'drafts', id));
                        setDoc(doc(db, 'profiles', snap.id), copyData).then(() => {
                            console.log("Finally Done")
                        })
                    })
                })
                setIsLoading(false)
            })
        }
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

    const generateCertificate =() => {
        let flag = true
        data.signedBy.forEach(element => flag = element.isSigned&&flag)
        console.log("post",  { text: data.text, signedBy: data.signedBy})
        postData('http://localhost:5050/encrypt', { text: data.text, signedBy: data.signedBy})
        .then(d => {
            addDoc(collection(db, "certificates"), ({
                title: data.title,
                text: d.text,
                author: user.uid,
                signedBy: d.signedBy,
                timestamp: d.timestamp,
                signature: d.signature
            }))
            .then(docRef =>{
                console.log("Certificate written with ID: ", docRef.id);

                getDoc(doc(db, 'profiles', user.uid)).then(snap => {
                  let copy = snap.data();
                  copy.certificates.push(docRef)
                  console.log("WTF")
                  let index = -1
                  for(let i=0; i<copy.drafts.length; i++) if(copy.drafts[i].id===id) index=i;
                  if (index > -1) {
                    copy.drafts.splice(index, 1)   
                  }
                  setDoc(doc(db, 'profiles', user.uid), copy).then(() => {
                    console.log("Inserted into the user")
                  })
                })
                navigate(`/certificate/${docRef.id}`)
                deleteDoc(doc(db, "drafts", id))
            })
            .catch(error =>{
                console.error("Error adding document: ", error);
            })
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
            {access&&(<div style={styles.linkContainer}>
                <div style={styles.text}>Get Signature</div>
                <div style={styles.inputContainer}><TextField style={styles.input} label="E-mail" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                <div style={styles.btnContainer}><Button style={styles.btn} variant="contained" onClick={updateEmail}>Add</Button></div>
            </div>)}
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
            
            {access&&(<Button style={styles.btn} variant="contained" onClick={generateCertificate}>Generate certificate</Button>)}
        </>
    )
}

export default SignCertificateModal
