import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Resizable } from "re-resizable";
import { vaultGetMenuStruct, vaultMenuClick, vaultViewSwitch } from '../../../actions'
import {Accordion, Icon} from 'semantic-ui-react';
import Switch from "react-switch";

const VaultMenu = (props) => {
    const [viewerSwitchFlag, setViewerSwitchFlag] = useState(true)
    
    useEffect(
        () => {
            if (props.vaultID) {
                props.vaultGetMenuStruct(props.vaultID)
            }
        }, [props.vaultID, props.templateCodeFlag]
    )

    // const transformToMenu = () => {
    //     if (Object.keys(props.menuOptions).length == 0){
    //         console.log('no Data')
    //         return <h1>NO DATA</h1>
    //     } else {
    //         console.log('data here!', props.menuOptions)
    //         return <h1>DATA</h1>
    //     }
    // }

    const transformToSubheading = (key) => {
        let subheading = []
        for (let choice of Object.keys(props.menuOptions[key])){
            if (choice != "id") {
                // this.choiceID = this.props.templateChoices[key][choice]['id']
                let menuid = props.menuOptions[key][choice]['id']
                subheading.push(
                    <p onClick={handleMenuClick} id={menuid} key={menuid}>
                        {/* <Link to = { "/home/" + this.props.templateChoices[key]['id'] + "/" + this.props.templateChoices[key][choice]['id']} */}
                        {/* id={this.props.templateChoices[key]['id'] + '-' + this.props.templateChoices[key][choice]['id']}>  */}
                            {choice}
                        {/* </Link> */}
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

    const handleSwitch = () => {
        if (props.viewerMode) {
            props.vaultViewSwitch(false)
        } else {
            props.vaultViewSwitch(true)
        }
    }

    const handleMenuClick = (e, d) => {
        props.vaultMenuClick(props.vaultID, e.target.id)
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
                                active = {true} //change this later
                                index = {index}
                                
                                className = "menu-header-h1 menu-choice"
                            >
                            <Icon name='dropdown' />
                                {category.toUpperCase()}
                            </Accordion.Title>
                            <Accordion.Content key={category} active={true}> //change this later
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
                        onChange={handleSwitch}
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
                        // disabled={false}
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
        'templateCodeFlag': state.appState['templateSubmittedFlag']
    })
}

export default connect(mapStateToProps, { vaultGetMenuStruct, vaultMenuClick, vaultViewSwitch }) (VaultMenu)