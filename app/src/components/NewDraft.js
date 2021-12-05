import React, { useState } from 'react'

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

    return (
        <div 
            style={{...styles.container, ...(hover? styles.containerHovered: {})}}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            onClick = {props.click}
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

