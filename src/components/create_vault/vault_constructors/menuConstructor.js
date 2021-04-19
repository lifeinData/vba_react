import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Resizable } from "re-resizable";
import { setFirstTimeLoad, vaultMenuParseMenuItem, vaultGetMenuStruct, vaultTagValueParse, vaultMenuClickParse, vaultMenuClickFlag, vaultViewSwitch } from '../../../actions'
import {Accordion, Icon, Button, Label} from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import Switch from "react-switch";
import SetEditorPwModal from './decorator_component/setPasswordModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Formik, Form, Field } from 'formik';

const VaultMenu = (props) => {

    let history = useHistory()
    const [showModal, setShowModal] = useState(false)
    useEffect (
        () => {
            console.log('template code flag useeffect triggered')
            props.vaultGetMenuStruct(props.vaultid)
        }
    , [props.templateCodeFlag])

    useEffect (
        () => {
            if (Object.keys(props.menuOptions).length === 0){
                props.setFirstTimeLoad(true)
                props.vaultViewSwitch(true)
            } else {
                props.setFirstTimeLoad(false)
            }

        }, [props.menuOptions, props.menuItemSelected, props.vaultMenuClicked]
    )
    
    const transformToSubheading = (key) => {
        let subheading = []
        console.log('transform to subheading runs  ', props.menuItemSelected)
        for (let choice of Object.keys(props.menuOptions[key])){
            if (choice != "id") {
                let menuid = props.menuOptions[key][choice]['id']
                subheading.push(
                    <React.Fragment>
                        <Link to={'/' + 'vaultID' + '/' + props.vaultid + '/' + menuid} onClick={handleMenuClick}>
                        <p className={menuid === props.menuItemSelected ? 'active' : ''} id={menuid} key={menuid}>
                            {choice}
                        </p>
                        </Link>
                    </React.Fragment>

                    

                )
            } 
        }

        return subheading
    }

    const switchDisabled = () => {
        if (Object.keys(props.menuOptions).length == 0) {
            return true
        } else {
            return false
        }
    }

    const handleMenuClick = (e) => {
        console.log('menu item clicked')
        props.vaultMenuClickParse(props.vaultid, e.target.id)
        props.vaultTagValueParse(props.vaultid, e.target.id)
        // history.replace(props.vaultid + '/' + e.target.id)
        if (props.vaultMenuClicked) {
            props.vaultMenuClickFlag(false)    
        } else if (!(props.vaultMenuClicked)) {
            props.vaultMenuClickFlag(true)
        }

        props.vaultMenuParseMenuItem(e.target.id)
        props.vaultViewSwitch(false)
    }

    const transformToMenu = () => {
        if (Object.keys(props.menuOptions).length != 0 ){
            let templateChoiceCate = []
            let index = 0
            for (let category of Object.keys(props.menuOptions)){
                if (category != 'id'){
                    templateChoiceCate.push(
                        <React.Fragment>
                            <Accordion.Title
                                active = {true}
                                index = {index}
                                className = "menu-header-h1 menu-choice"
                            >
                            <Icon name='dropdown' />
                                {category.toUpperCase()}
                            </Accordion.Title>
                            <Accordion.Content key={category} active={true}>
                                {transformToSubheading(category)}
                            </Accordion.Content>
                        </React.Fragment>
                    
                    )
                    index += 1
                }
            }
    
            return templateChoiceCate
        } else {
            return <div><h1>NO DATA</h1></div>
        }

    }

    const showSetPwModal = () => {
        if (showModal) {
            return <SetEditorPwModal />
        } else {
            return null;
        }
    }
    
    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="set-pw-modal-cont"
                open={showModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={showModal}>
                    <SetEditorPwModal />
                </Fade>
            </Modal>
            <Resizable
                defaultSize={{
                    width:344,
                    height:"calc(100vh - 44px)",
                }}
                className="templateChoiceMenu"
                minWidth="330px"
                maxWidth="677px"
                enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            >
                

                <Accordion
                    exclusive={false}
                    className="menu-choice-header-h1"
                >

                    {transformToMenu()}
                    
                </Accordion>
                <div className="editor-optn-cont">
                    <Button basic color="blue" className="config-btn" onClick={()=>{setShowModal(true)}}>
                        Set Editor Password
                    </Button>
                    <Button basic color="blue" className="config-btn">
                        Set Deletion Time
                    </Button>
                    <div>
                        <label className="editor-switch-cont" htmlFor="material-switch">
                            <p className="switch-lbl">Editor Mode</p>
                            <Switch
                                checked={props.viewerMode}
                                onChange={() => {props.vaultViewSwitch(props.viewerMode == true ? false : true )}}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                disabled={switchDisabled()}
                                className="react-switch"
                                id="material-switch"
                            />
                        </label>
                    </div>
                </div>
            </Resizable>
        </React.Fragment>
        
    )
}

const mapStateToProps = (state) => {
    return ({
        'menuOptions': state.vaultSessionMenuData['data'],
        'viewerMode' : state.appState['viewerMode'],
        'templateCodeFlag': state.appState['templateSubmittedFlag'],
        'vaultMenuClicked': state.appState['menuClickedFlag'],
        'vaultid': state.appState['vaultid'],
        'menuItemSelected': state.appState['menuIdSelected'],
    })
}

export default connect(mapStateToProps, { setFirstTimeLoad, vaultMenuParseMenuItem, vaultTagValueParse, vaultGetMenuStruct, vaultMenuClickParse, vaultMenuClickFlag, vaultViewSwitch }) (VaultMenu)