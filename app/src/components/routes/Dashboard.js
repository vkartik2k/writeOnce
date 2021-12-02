import React from 'react'
import MainHeader from '../MainHeader'
import Notice from '../Notice'
import NewDraft from '../NewDraft'
import DraftCard from '../DraftCard'
import CertificateCard from '../CertificateCard'

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
  return (
    <div>
      <MainHeader/>
      <Notice/>
      <div style={styles.main}>
        <span style={styles.title}>My Drafts</span>
        <div style={styles.flexContainer}>
          <NewDraft/>
          <DraftCard/>
          <DraftCard/>
          <DraftCard/>
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
