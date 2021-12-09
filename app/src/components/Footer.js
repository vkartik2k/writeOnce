import React from 'react'
import LinkedIn from '../assets/linkedIn.svg'
import Instagram from '../assets/instagram.svg'

const styles ={
    container: {
        backgroundColor: '#202020',
        paddingTop: '50px',
        paddingBottom: '20px',
        marginTop: '100px',
        fontFamily: 'Ubuntu',
        color: 'white',
        paddingLeft: '18%',
        paddingRight: '18%'
    },
    footerEnd : {
        textAlign: 'center'
    },
    footer : {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: '50px'
    },
    bold : {
        fontWeight: '500',
        fontSize: '32px'
    },
    heading: {
        fontWeight: '300',
        fontSize: '32px'
    },
    allCaps: {
        fontWeight: '500'
    },
    flex: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    block : {
        width: '250px'
    },
    flexLogo: {
        display:'flex',
        alignItems: 'center'
    }
} 

function Footer() {
    return (
        <div style={styles.container}>
            <div style={styles.flex}>
                <div style={styles.block}>
                <span style={styles.heading}>Write<span style={styles.bold}>Once</span></span>
                </div>
                <div style={styles.block}>
                    <span style={styles.allCaps}>FOLLOW US ON</span>
                </div>
                <div style={styles.block}>
                    <span style={styles.allCaps}>GET IN TOUCH</span>
                </div>
            </div>
            <div style={styles.footer}>
                <div  style={styles.block}>
                    <br/>
                    <br/>
                    Home
                    <br/>
                    <br/>
                    Dashboard
                    <br/>
                    <br/>
                    Welcome Note
                </div>
                <div style={styles.block}>
                    <br/>
                    <br/>
                    <div style={styles.flexLogo}>
                        <div style={{paddingRight: '5px'}}><img src={LinkedIn} alt="" height="28px"/></div>
                        <div>LinkedIn</div>
                    </div>
                    <br/>
                    <div style={styles.flexLogo}>
                        <div style={{paddingRight: '5px'}}><img src={Instagram} alt="" height="28px"/></div>
                        <div>Instagram</div>
                    </div>
                </div>
                <div style={styles.block}>
                    <br/>
                    <br/>
                    Email - kartikverma2k@gmail.com
                    <br/>
                    <br/>
                    Address - Delhi Technological University,
                    Shahbad Daulatpur, Main Bawana Road, Delhi-110042. India
                </div>
                
            </div>
            <div style={styles.footerEnd}>
            © 2021 WriteOnce <br/>
            Created by Kartik Verma
            </div>
        </div>
    )
}

export default Footer
