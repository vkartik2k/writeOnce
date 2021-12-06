import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore"; 
import MainHeader from '../MainHeader'
import Notice from '../Notice'
import NewDraft from '../NewDraft'
import DraftCard from '../DraftCard'
import CertificateCard from '../CertificateCard'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const styles = {
  main: {
    maxWidth: '1030px',
    width: '85%',
    margin: 'auto'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600'
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    marginLeft: '-10px',
    marginRight: '-10px',
    paddingTop: '10px',
    paddingBottom: '10px'
  }
}

function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    const docRef = doc(db, 'profiles', user.uid);
    
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currData = docSnap.data();
      currData.draftData = []
      currData.certificateData = []
      currData.drafts.forEach(async (element, i) => {
        let snap = await getDoc(element)
        currData.draftData.push({...snap.data(), id:element.id})
      });
      currData.certificates.forEach(async (element, i) => {
        let snap = await getDoc(element)
        currData.certificateData.push({...snap.data(), id:element.id})
        if(i===currData.certificates.length - 1) {
          setData(currData)
          console.log("Yo bro")
        }
      });

      setLoading(false)
    } else {
      console.log("No such document!");
      setDoc(docRef, {
        drafts: [],
        certificates: [],
        sharedDrafts: [],
        sharedCertificates: [],
        email: user.email
      }).then(() => {
        console.log("Created profile for user")
        loadData()
      })
    }
  }

  useEffect(() => {
    if(user.uid) {
      loadData()
    }
  }, [user])
  
  return (
    <div>
      { loading && (<Loading/>)} 
      <MainHeader/>
      <Notice/>
      <div style={styles.main}>
        <span style={styles.title}>My Drafts</span>
        <div style={styles.flexContainer}>
          <NewDraft click={()=>{
                addDoc(collection(db, "drafts"), ({
                    title: "Untitled Draft",
                    text: "",
                    author: user.uid,
                    signedBy: [{
                      email: user.email,
                      isSigned: false
                    }]
                    
                }))
                .then(docRef =>{
                    console.log("Document written with ID: ", docRef.id);

                    getDoc(doc(db, 'profiles', user.uid)).then(snap => {
                      let copy = snap.data();
                      copy.drafts.push(docRef)
                      setDoc(doc(db, 'profiles', user.uid), copy).then(() => {
                        console.log("Inserted into the user")
                      })
                    })
                    navigate(`/draft/${docRef.id}`)
                })
                .catch(error =>{
                    console.error("Error adding document: ", error);
                })
            }}/>
          {!loading && data.draftData && data.draftData.map((draft, i) => (<Link to={`/draft/${draft.id}`} style={{ textDecoration: 'none' }}><DraftCard title={draft.title} text={draft.text} key={i}/></Link>))}
        </div>
        <span style={styles.title}>My Digital Certificates</span>
        <div style={styles.flexContainer}>
          <CertificateCard/>
          <CertificateCard/>
          <CertificateCard/>
          <CertificateCard/>
          <CertificateCard/>
          <CertificateCard/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
