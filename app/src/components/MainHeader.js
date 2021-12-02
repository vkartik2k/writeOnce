import React from 'react'

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
        position: 'sticky',
        top: '0px',
        width: '100%'
    },
    logo: {
        paddingLeft: '20px',
        paddingTop: '8px',
        paddingBottom: '5px',
        width: '20%'
    },
    userAvatar: {
        paddingRight: '20px',
        width: '20%',
        textAlign: 'right'
    },
    round: {
        borderRadius : '50%'
    },
    search : {
        border: '0px',
        padding: '10px',
        fontSize: '19px',
        minWidth: '500px',
        borderRadius: '10px',
        paddingLeft: '50px',
        marginLeft: '-20px',
        backgroundColor: 'white',
    },
    searchImg: {
        position: 'relative',
        left:'13px'
    }
}

function MainHeader() {
    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <img src="logo.png" alt="" height="45px"/>&nbsp;
                <img src="logo_extended.svg" alt="" height="45px"/>
            </div>
            <div>
                <img src="search.png" alt="" width='15px' style={styles.searchImg}/>
                <input 
                    style={styles.search}
                    placeholder="Search"
                />
            </div>
            <div style={styles.userAvatar}>
                <img src="user_avatar.png" alt="" height="35px" style={styles.round}/>
            </div>
        </div>
    )
}

export default MainHeader
