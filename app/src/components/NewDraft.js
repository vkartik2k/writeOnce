import React, { useState } from 'react'
import { db } from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import {collection, addDoc} from 'firebase/firestore'


const styles = {
    container: {
        border: '#AEAEAE 1px solid',
        borderRadius: '20px',
        height: '220px',
        width: '190px',
        margin: '10px',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '17px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center'
    },
    containerHovered: {
        boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.15)',
    },
    width100: {
        width:"100%"
    }
}

export default function NewDraft(props) {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate();

    return (
        <div 
            style={{...styles.container, ...(hover? styles.containerHovered: {})}}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            onClick={()=>{
                console.log(props)
                addDoc(collection(db, "drafts"), ({
                    title: "Untitled Draft",
                    text: ""
                }))
                .then(docRef =>{
                    console.log("Document written with ID: ", docRef.id);
                    navigate(`/draft/${docRef.id}`)
                })
                .catch(error =>{
                    console.error("Error adding document: ", error);
                })
            }}
        >
            <div style={styles.width100}>
                <img src="certificate.svg" alt="" height="50px"/>
                <br/>
                <br/>
                Create New <br/> 
                Digital Certificate <br/>  
                Draft
            </div>
            
        </div>
    )
}

