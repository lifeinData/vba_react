import React, { useEffect, useState } from 'react';
import { setVaultID, setFirstTimeLoad, vaultViewSwitch, vaultMenuClickParse, vaultMenuParseMenuItem, vaultTagValueParse } from '../../actions';
import { Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import parseRequestAxio from '../../apis/parseRequest';
import VaultMenu from './vault_constructors/menuConstructor'
import TemplateDisplay from './vault_constructors/templateDisplayConstructor'
import InformationBoxContainer from './vault_constructors/informationBoxContainer'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux';
import { makeid } from '../../utils/generate-id';
import TemplateInputArea from './vault_constructors/templateInputArea';

const CustomVaultBuild = (props) => {
    const history = useHistory();

    useEffect(()=>{
        console.log('create_vault useeffect rendered. vaultid: ', props.vaultid)
        let vaultIDExtract = /(?<=\/vaultID\/)(.{8})(?=\/)|(?<=\/vaultID\/)(.{8})/
        let vaultIDCapture = window.location.href.match(vaultIDExtract)
        
        if ((vaultIDCapture === null) && (props.vaultid === '')) {
            let uniqueID = makeid(8)
            history.push('/vaultID/' + uniqueID)
            // props.setVaultID(uniqueID)
            
        } else {
            if (props.vaultid !== vaultIDCapture[0]) {
                // props.vaultViewSwitch(false)
                console.log('vault tag value parse runs here    ', vaultIDCapture[0])
                props.setVaultID(vaultIDCapture[0])
                if (props.match.params.templateid){
                    props.vaultMenuParseMenuItem(props.match.params.templateid)
                    props.vaultTagValueParse(vaultIDCapture[0], props.match.params.templateid)
                    
                }
            }
        }

        
        // setvaultidloaded(true)
    }, [props.vaultid, props.viewerMode])

    const templateDisplay = () => {
        
        if (!(props.viewerMode)) {
            return (
                <TemplateInputArea />
            )
        } else if (props.viewerMode) {
            return (
                <TemplateDisplay/>
            )
        }
    }

    const displayInformationBox = () => {
        if (props.viewerMode) {
            return <InformationBoxContainer />
        } else {
            return null;
        }
    }

    const testFunction = () => {
        console.log('create vault does run')
    }
    return (
        <React.Fragment>
            <div id="main-app-layout">
                {testFunction()}
                <VaultMenu />
                {templateDisplay()}
                {displayInformationBox()}
            </div>
        </React.Fragment>
    )
    
}

const mapStateToProps = (state) => {
    return {
        vaultid : state.appState['vaultid'],
        viewerMode : state.appState['viewerMode']
    }
}

export default connect(mapStateToProps, { setFirstTimeLoad, setVaultID, vaultMenuParseMenuItem, vaultTagValueParse, vaultMenuClickParse, vaultViewSwitch })(CustomVaultBuild);