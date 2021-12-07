import React from 'react'
import Notice from './Notice'
import ReactHtmlParser from 'react-html-parser'

const styles = {
    page: {
        height: '1056px',
        width: '816px',
        backgroundColor: 'white',
        margin: 'auto',
        marginTop: '10px',
        boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.36)',
        padding: '70px',
        fontFamily: 'Courier New'
    },
    signature: {
        color: '#707070'
    }
}

function Doc(props) {
    return (
        <div style={styles.page}>
            <Notice/>
            {ReactHtmlParser(props.html)}
        </div>
    )
}

export default Doc
