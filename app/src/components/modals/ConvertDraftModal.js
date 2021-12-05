import React from 'react'

const styles = {
    container: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: '0px',
        left: '0px',
        // backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '100',
        textAlign:'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    content : {
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '2px solid black',
        height: '200px',
        width: '400px'
    }
}

function ConvertDraftModal({closeModal}) {
    return (
        <div style={styles.container} onClick={closeModal}>
            <div style={styles.content}>

            </div>
        </div>
    )
}

export default ConvertDraftModal
