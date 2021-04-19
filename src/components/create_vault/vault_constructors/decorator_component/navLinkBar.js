import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const NavLinkBar = (props) => {
    let history = useHistory()
    const [popUp, setPopUp] = useState(false)

    const linkBarFunctions = {
        rawCodeCopy : () => {
            navigator.clipboard.writeText(props.templateCode)
            setPopUp(true)
        },

        vaultLinkCopy : () => {
            navigator.clipboard.writeText(window.location.origin + '/vaultID/' + props.vaultid)
            setPopUp(true)
        },

        templateLinkCopy : () => {
            navigator.clipboard.writeText(window.location.origin + history.location.pathname)
            setPopUp(true)
        }
    }

    const getCopyLinkPopupStatus = () => {
        if (popUp) {
            return 'linkbar-popup active'
        } else {
            return 'linkbar-popup'
        }
    }

    return (
        <div className="link-bar">
        <button 
            onClick={linkBarFunctions['rawCodeCopy']} 
            className="link-btn"
            onMouseLeave={()=>{setPopUp(false)}}> 
                Raw Code
        </button>
        <button 
            onClick={linkBarFunctions['vaultLinkCopy']} 
            className="link-btn"
            onMouseLeave={()=>{setPopUp(false)}}> 
                Vault Link 
        </button>
        <button 
            onClick={linkBarFunctions['templateLinkCopy']} 
            className="link-btn"
            onMouseLeave={()=>{setPopUp(false)}}>
                Template Link
        </button>
        <div className={getCopyLinkPopupStatus()}>
            Link Copied
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        templateCode: state.templateTags['templateCode'],
        vaultid: state.appState['vaultid']
    })
}

export default connect (mapStateToProps)(NavLinkBar)