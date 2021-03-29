import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Resizable } from "re-resizable";
import { vaultMenuParseMenuItem, vaultGetMenuStruct, vaultTagValueParse, vaultMenuClickParse, vaultMenuClickFlag, vaultViewSwitch } from '../../../actions'
import {Accordion, Icon} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Switch from "react-switch";

const VaultMenu = (props) => {

    let history = useHistory()

    useEffect (
        () => {
            console.log('initial menu constructor get request. vaultid ', props.vaultid)
            props.vaultGetMenuStruct(props.vaultid)
        }
    , [props.templateCodeFlag])

    useEffect (
        // checks whether the vault id already exists
        () => {
            console.log('menuOptoin switched')
            if (Object.keys(props.menuOptions).length > 0) {
                if (props.templateCodeFlag !== '') {
                    props.vaultViewSwitch(true)
                } else {
                    props.vaultViewSwitch(false)
                }
            } else if (Object.keys(props.menuOptions).length == 0){
                props.vaultViewSwitch(true)
            }

        }, [props.menuOptions]
    )
    
    useEffect(
        () => {
            console.log('menuitemselected   ', props.menuItemSelected)
        }, [props.menuItemSelected]
    )
    // const checkIfActive = () => {

    // }

    const transformToSubheading = (key) => {
        let subheading = []
        console.log('transform to subheading runs  ', props.menuItemSelected)
        for (let choice of Object.keys(props.menuOptions[key])){
            if (choice != "id") {
                // this.choiceID = this.props.templateChoices[key][choice]['id']
                let menuid = props.menuOptions[key][choice]['id']
                subheading.push(
                    <p className={menuid === props.menuItemSelected ? 'active' : ''} onClick={handleMenuClick} id={menuid} key={menuid}>
                        {choice}
                    </p>
                )
            } 
        }

        return subheading
    }

    const switchText = () => {
        if (props.viewerMode) {
            return "Vault Editor Mode"
        } else {
            return "Vault Viewer Mode"
        }
    }

    const switchDisabled = () => {
        if (Object.keys(props.menuOptions).length == 0) {
            return true
        } else {
            return false
        }
    }

    const handleMenuClick = (e) => {
        props.vaultMenuClickParse(props.vaultid, e.target.id)
        props.vaultTagValueParse(props.vaultid, e.target.id)
        history.push(e.target.id)
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

    const checkViewerMode = () => {
        // case 1: welcome message
       

    }
    
    return (
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
                <label htmlFor="material-switch">
                    <span>{switchText()}</span>
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
                {transformToMenu()}
            </Accordion>

        </Resizable>
    )
}

const mapStateToProps = (state) => {
    return ({
        'menuOptions': state.vaultSessionMenuData['data'],
        'viewerMode' : state.appState['viewerMode'],
        'templateCodeFlag': state.appState['templateSubmittedFlag'],
        'vaultMenuClicked': state.appState['menuClickedFlag'],
        'vaultid': state.appState['vaultid'],
        'menuItemSelected': state.appState['menuIdSelected']
    })
}

export default connect(mapStateToProps, { vaultMenuParseMenuItem, vaultTagValueParse, vaultGetMenuStruct, vaultMenuClickParse, vaultMenuClickFlag, vaultViewSwitch }) (VaultMenu)