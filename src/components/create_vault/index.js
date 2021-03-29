import React, { useEffect, useState } from 'react';
import { setVaultID, vaultViewSwitch, vaultMenuClickParse, vaultMenuParseMenuItem, vaultTagValueParse } from '../../actions';
import { Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import parseRequestAxio from '../../apis/parseRequest';
import VaultMenu from './vault_constructors/menuConstructor'
import TemplateDisplay from './vault_constructors/templateDisplayConstructor'
import InformationBoxContainer from './vault_constructors/informationBoxContainer'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux';
import TemplateInputArea from './vault_constructors/templateInputArea';

const CustomVaultBuild = (props) => {
    let history = useHistory();
    const [vaultidloaded, setvaultidloaded] = useState(false)

    function makeid(length) {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    useEffect(()=>{
        console.log('create_vault useeffect rendered')
        console.log('this is the vaultID: ', props.vaultid)
        let vaultIDExtract = /(?<=\/vaultID\/)(.{8})(?=\/)|(?<=\/vaultID\/)(.{8})/
        let vaultIDCapture = window.location.href.match(vaultIDExtract)
        
        if ((vaultIDCapture === null) && (props.vaultid === '')) {
            let uniqueID = makeid(8)
            history.push('/vaultID/' + uniqueID)
            props.setVaultID(uniqueID)
        } else {
            if (props.vaultID !== vaultIDCapture[0]) {
                props.setVaultID(vaultIDCapture[0])
                if (props.match.params.templateid){
                    console.log('vault tag value parse runs here')
                    props.vaultMenuParseMenuItem(props.match.params.templateid)
                    props.vaultTagValueParse(vaultIDCapture[0], props.match.params.templateid)
                    
                }
            }
        }

        
        // setvaultidloaded(true)
    }, [props.vaultid])

    const templateDisplay = () => {
        if (!(props.viewerMode)) {
            return (
                <TemplateDisplay/>
            )
        } else if (props.viewerMode) {
            return <TemplateInputArea />
        }
    }

    if (props.vaultid != '') {
        return (
            <React.Fragment>
                <div id="main-app-layout">
                    <VaultMenu />
                    {templateDisplay()}
                    <InformationBoxContainer />
                </div>
            </React.Fragment>
        )
    } else {
        return null
    }

}

const mapStateToProps = (state) => {
    return {
        vaultid : state.appState['vaultid'],
        viewerMode : state.appState['viewerMode']
    }
}

export default connect(mapStateToProps, { setVaultID, vaultMenuParseMenuItem, vaultTagValueParse, vaultMenuClickParse, vaultViewSwitch })(CustomVaultBuild);