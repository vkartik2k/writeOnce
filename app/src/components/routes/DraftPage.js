import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router';
import DraftHeader from '../DraftHeader';
import { UserContext } from '../../App';
import Loading from '../Loading';
import lock from '../../assets/lock.png'
import save from '../../assets/save.svg'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { drawerClasses, Modal } from '@mui/material';
import SignCertificateModal from '../SignCertificateModal';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const styles = {
    container: {
        backgroundColor: '#D4D4D4',
        paddingBottom: '10px'
    },
    editor: {
        height: '1056px',
        width: '816px',
        backgroundColor: 'white',
        margin: 'auto',
        marginTop: '10px',
        boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.36)',
        padding: '70px',
        fontFamily: 'Courier New',
        zIndex: '80'
    },
    toolbar: {
        backgroundColor: '#EFEFEF',
        textAlign: 'center',
        position: 'sticky',
        top:'60px',
        zIndex: '99'
    },
    mainBtnContainer : {
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        zIndex: '98',
    },
    mainBtn: {
        backgroundColor:'#fbbc04',
        borderRadius: '4px',
        padding:'12px',
        fontWeight: '600',
        fontFamily: `'Source Sans Pro', serif`,
        color: 'black',
        cursor: 'pointer',
        boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.23)',
        fontSize: '17px',
        display: 'inline-block'
    },
    saveBtn: {
        backgroundColor:'#1976d2',
        borderRadius: '4px',
        padding:'12px',
        fontWeight: '600',
        fontFamily: `'Source Sans Pro', serif`,
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.23)',
        fontSize: '17px',
        display: 'inline-block',
        marginRight: '10px'
    },
    lock: {
        display: 'inline-block',
        paddingRight: '5px',
        paddingTop:'2px'
    }, 
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        backgroundColor: 'white',
        border: '0px',
        padding: '20px',
        zIndex: 100,
        borderRadius: '10px',
        textAlign: 'center'
    }
}

const modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

function DraftPage(props) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [dataDraft, setDataDraft] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [access, setAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user= useContext(UserContext)
    const params = useParams();
    const [snackOpen, setSnackOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        setDataDraft(data=> {
            return {...data, text: value}
        })
        console.log(value, dataDraft)
    }, [value])
    // for Styling
    useEffect(()=> {
        document.getElementsByClassName('ql-container')[0].style.height = styles.editor.height
        document.getElementsByClassName('ql-container')[0].style.width = styles.editor.width
        document.getElementsByClassName('ql-container')[0].style.backgroundColor = styles.editor.backgroundColor
        document.getElementsByClassName('ql-container')[0].style.margin = styles.editor.margin
        document.getElementsByClassName('ql-container')[0].style.marginTop = styles.editor.marginTop
        document.getElementsByClassName('ql-container')[0].style.boxShadow = styles.editor.boxShadow
        document.getElementsByClassName('ql-container')[0].style.padding = styles.editor.padding
        document.getElementsByClassName('ql-container')[0].style.fontFamily = styles.editor.fontFamily


        document.getElementsByClassName('ql-toolbar')[0].style.backgroundColor = styles.toolbar.backgroundColor
        document.getElementsByClassName('ql-toolbar')[0].style.textAlign = styles.toolbar.textAlign
        document.getElementsByClassName('ql-toolbar')[0].style.position = styles.toolbar.position
        document.getElementsByClassName('ql-toolbar')[0].style.top = styles.toolbar.top
        document.getElementsByClassName('ql-toolbar')[0].style.zIndex = styles.toolbar.zIndex
    }, [])

    // for loading
    useEffect(()=> {
        setIsValid(false);
        setIsLoading(true);
        const docRef = doc(db, 'drafts', params.id);
        
        const startTime = Date.now()
        getDoc(docRef).then(docSnap => {

            if(docSnap.exists()) {
                let flag = false;
                docSnap.data().signedBy.forEach((element) => {
                    if(element.email===user.email) flag = true;
                })
                if(docSnap.data().author===user.uid) {
                    setTitle(docSnap.data().title)
                    setValue(docSnap.data().text)
                    setDataDraft(docSnap.data())
                    setIsValid(true)
                    setAccess(true)
                }
                else if(flag) {
                    setTitle(docSnap.data().title)
                    setValue(docSnap.data().text)
                    setDataDraft(docSnap.data())
                    setAccess(true)
                }
                else {
                    console.log("Access")
                    setTitle("Access Denied!")
                    setAccess(false)
                }
                console.log(Date.now()-startTime)
                setIsLoading(false);
            }
            else {
                console.log("No Such Draft Exists")
            }
        })
    }, [user])

    const handleClick = () => setSnackOpen(true);

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
        setSnackOpen(false);
    }

    const saveChanges = () => {
        if(isValid) {
            const docRef = doc(db, 'drafts', params.id);
            setDoc(docRef, {
                ...dataDraft,
                text: value,
                title: title,
            }).then(() => {
                console.log('Changes saved!')
                handleClick()
            })
        }
    }

    return (
        <div style={styles.container}>
            {isLoading && <Loading/>}
            <div style={styles.mainBtnContainer}>
                {isValid&&(<div style={styles.saveBtn} onClick={saveChanges}> <img style={styles.lock} src={save} alt="lock" height='15px'/>Save Changes</div>)}
                {access&&<div style={styles.mainBtn} onClick={() => setModalOpen(true)}> <img style={styles.lock} src={lock} alt="lock" height='15px'/>Sign Certificate</div>}

            </div>
            <DraftHeader title={title} changeTitle={setTitle} saveChanges={saveChanges} setDraft = {setDataDraft}/>
            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={setValue}
                modules={modules}
                formats={formats}
            />
            <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Changes saved on cloud!
                </Alert>
            </Snackbar>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={styles.box}>
                    <SignCertificateModal data={dataDraft} id={params.id} setData = {setDataDraft} access={isValid}/>
                </div>
            </Modal>
        </div>
    )
}

export default DraftPage
