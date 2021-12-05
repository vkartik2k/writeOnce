import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';

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

function SignCertificateModal() {
    return (
        <>
            <div >
                Note: This is an irreversible action. Once converted into a digital certificate, the document is immutable. 
            </div>
            <br/>
            <div style={styles.linkContainer}>
                <div style={styles.inputContainer}><TextField style={styles.input} label="Link" variant="filled" value={"Will add link here"} disabled/></div>
            </div>
            <div>

            </div>
            <div style={styles.linkContainer}>
                <div style={styles.text}>Get Signature</div>
                <div style={styles.inputContainer}><TextField style={styles.input} label="E-mail" variant="filled" /></div>
                <div style={styles.btnContainer}><Button style={styles.btn} variant="contained">Add</Button></div>
            </div>
            <div style={styles.flex}>
                <div style={styles.text}><Avatar>V</Avatar></div>
                <div style={styles.email}><span style={styles.bold}>vkartik2k@gmail.com</span> (Owner)</div>
                <div style={styles.btnContainer}><Button style={styles.btn} variant="contained">Sign</Button></div>
            </div>
            <div style={styles.flex}>
                <div style={styles.text}><Avatar>A</Avatar></div>
                <div style={styles.email}><span style={styles.bold}>approval@gmail.com</span></div>
                <div style={styles.btnContainer}>Pending</div>
            </div>
            <div style={styles.flex}>
                <div style={styles.text}><Avatar>A</Avatar></div>
                <div style={styles.email}><span style={styles.bold}>approval@gmail.com</span></div>
                <div style={styles.btnContainer}>Pending</div>
            </div>
            <div style={styles.flex}>
                <div style={styles.text}><Avatar>A</Avatar></div>
                <div style={styles.email}><span style={styles.bold}>approval@gmail.com</span></div>
                <div style={styles.btnContainer}>Pending</div>
            </div>
            <Button style={styles.btn} variant="contained">Convert into certificate</Button>
        </>
    )
}

export default SignCertificateModal
