import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import MainHeader from '../MainHeader'
import Notice from '../Notice'
import NewDraft from '../NewDraft'
import DraftCard from '../DraftCard'
import CertificateCard from '../CertificateCard'
import { UserContext } from '../../App';

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

  const loadData = async () => {
    setLoading(true);
    const docRef = doc(db, 'profiles', user.uid);
    
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currData = docSnap.data();
      currData.draftData = []
      currData.drafts.forEach(async (element, i) => {
        let snap = await getDoc(element)
        currData.draftData.push(snap.data())
        if(i===currData.drafts.length - 1) {
          setData(currData)
          setLoading(false)
        }
      });
    } else {
      console.log("No such document!");
      setDoc(docRef, {
        drafts: [],
        cerficates: [],
        sharedDrafts: [],
        sharedCertificates: []
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
      <MainHeader/>
      <Notice/>
      <div style={styles.main}>
        <span style={styles.title}>My Drafts</span>
        <div style={styles.flexContainer}>
          <NewDraft/>
          {!loading && data.draftData.map((draft, i) => (<DraftCard title={draft.title} text={draft.text} key={i}/>))}
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
