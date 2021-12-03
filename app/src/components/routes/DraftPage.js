import React, { useEffect, useState } from 'react'
import CertificateHeader from '../CertificateHeader'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
        fontFamily: 'Courier New'
    },
    toolbar: {
        backgroundColor: '#EFEFEF',
        textAlign: 'center',
        position: 'sticky',
        top:'60px',
        zIndex: '100'
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

function DraftPage() {
    const [value, setValue] = useState('');

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

    return (
        <div style={styles.container}>
            <CertificateHeader/>
            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={setValue}
                modules={modules}
                formats={formats}
            />
        </div>
    )
}

export default DraftPage
