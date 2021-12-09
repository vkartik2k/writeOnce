import React from 'react'
import Header from '../Header'
import mainImg from '../../assets/mainImg.svg'
import mainText from '../../assets/mainText.svg'
import DashboardImg from '../../assets/Dashboard.svg'
import certificateImg from '../../assets/certificate.svg'
import Footer from '../Footer'

const styles = {
    blackBtn: {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px',
        fontWeight: '600',
        maxWidth: '200px',
        textAlign: 'center',
        margin: 'auto',
        fontSize: '18px',
        cursor: 'pointer'
    },
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60px',
        marginBottom: '60px'
    },
    img: {
        marginTop: '5px',
        borderRadius: '10px',
        boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.2)',
    },
    imgContainer: {
        overflow: 'hidden',
        display: 'flex',
        marginTop: '55px',
        marginLeft: '-100px',
    },
    space: {
        width: '4%'
    }
}

function LandingPage() {

    return (
        <div>
            <Header/>
            <div style={styles.main}>
                <div>
                    <img src={mainImg} alt="" height="310px"/>
                </div>
                <div style={styles.space}></div>
                <div style={styles.space}></div>
                <div>
                    <img src={mainText} alt="" height="260px"/>
                </div>
            </div>
            <div>
                <div style={styles.blackBtn}>
                    Get Started for free
                </div>
            </div>
            <div style={styles.imgContainer}>
                <div>
                    <img src={DashboardImg} alt="" width="100%" style={styles.img}/>
                </div>
                <div style={styles.space}></div>
                <div>
                    <img src={certificateImg} alt="" width="100%" style={styles.img}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage
