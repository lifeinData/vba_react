import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Resizable } from "re-resizable";
import { propTypes } from 'react-bootstrap/esm/Image';
import { Accordion, Icon, Button, Tab} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { vaultFunctionClicked } from '../../../actions'

const InformationBoxContainer = (props) => {
    let history = useHistory()
    const [popupActive, setpopupActive] = useState(false)
    const [codeHash, setCodeHash] = useState('')

    const codeBlockDescription = () => {
        // console.log('this is the code hash', functionSelected)
        let funcDesciptionTxt;
        let funcHeaderTxt;

        if (props.templateCode !== '') {

            if (props.functionSelected == 'overall_descrip'){
                funcDesciptionTxt = props.templateTagData['overall_descrip']
                funcHeaderTxt = "Overall Description"
                
            } else {
                funcDesciptionTxt = props.templateTagData['func_descrip'][props.functionSelected]
                funcHeaderTxt = props.functionSelected + ' Description'
            }

            funcDesciptionTxt = funcDesciptionTxt === '' ? 'No Descrption Provided' : funcDesciptionTxt

            return (
                <div>
                    <p className="descrip-header">{funcHeaderTxt}</p>
                    <p className="descrip-txt">
                        {funcDesciptionTxt}
                    </p>
                </div>
            )
        }

        return null;
    }

    useEffect(() => {
        console.log('info box container loaded')
    }, [props.menuOptions, props.vaultMenuClicked, props.menuItemSelected, props.functionList])



    const paneConstructor = () => {
        let indPanes
        if ((props.menuOptions !== '') && (props.menuItemSelected === '')){
            return (
                <div>Must click on a template to start</div>
            )
        } else if (((props.menuItemSelected !== '') && (props.functionList !== '')) || (props.templateCode != '')) {
            indPanes = [
                {
                    menuItem: 'Subroutines',
                    render: () => populateFunctions('sub')
                },
                {
                    menuItem: 'Functions',
                    render: () => populateFunctions('func')
                }
            ]
    
            return <Tab className="breakdown-btn-cont" menu={{ pointing: true }} panes={indPanes} />
        }

    }

    const copyCodeLinkOnClick = (codeBlockName) => {
        let fullUrl = window.location.origin + history.location.pathname + "#" + codeBlockName
        // console.log ('this is the fullUrl ', fullUrl)
        navigator.clipboard.writeText(fullUrl)
    }

    const getCopyLinkPopupStatus = (codeBlockName) => {
        if (codeBlockName == codeHash) {
            return "copy-link-popup active"
        } else {
            return "copy-link-popup"
        }
    }

    const getFunctionButtonActiveStatus = (codeBlockName) => {
        if (codeBlockName == props.functionSelected) {
            return "breakdown-btn active"
        } else {
            return "breakdown-btn"
        }
    }

    const populateFunctions = (mode=null) => {
        let functionButtonArea
        if (mode == 'sub'){
            functionButtonArea = props.functionList['sub'].map( (funcName) => {
                return (
                    <div className="code-btn-breakdown-cont">
                        <Button
                            basic
                            color="blue"
                            className = {getFunctionButtonActiveStatus(funcName)}
                            onClick={() => {
                                document.getElementById(funcName).scrollIntoView()
                                props.vaultFunctionClicked(funcName)
                                history.push('#'+ funcName)}}>
                                {funcName}
                        </Button>
                        <div className={getCopyLinkPopupStatus(funcName)}>
                            Link Copied
                        </div>
                        <Button
                            basic
                            color="blue"
                            className="copy-link"
                            onMouseLeave={()=>{setCodeHash('')}}
                            onClick = {() => {
                                    copyCodeLinkOnClick(funcName)
                                    setCodeHash(funcName)
                        }}>
                            🔗
                        </Button>
                    </div>
                    
                
                )
            })

            functionButtonArea.splice(0, 0,
                <div className="code-btn-breakdown-cont">
                    <Button  
                        basic
                        color="blue"
                        className = {getFunctionButtonActiveStatus('overall_descrip')}
                        onClick={() => {
                            props.vaultFunctionClicked("overall_descrip")}}>
                        Overall Description
                    </Button>
                </div>

            )
            
        } else if (mode == 'func') {
            functionButtonArea = props.functionList['function'].map( (funcName) => {
                return (
                    <div className="code-btn-breakdown-cont">
                        <Button
                            className={getFunctionButtonActiveStatus(funcName)}
                            basic
                            color="blue"
                            onClick={() => {
                                document.getElementById(funcName).scrollIntoView()
                                props.vaultFunctionClicked(funcName)
                                history.push('#'+ funcName)}}>
                                {funcName}
                        </Button>
                        <div className={getCopyLinkPopupStatus(funcName)}>
                            Link Copied
                        </div>
                        <Button
                            className="copy-link"
                            basic
                            color="blue"
                            onMouseLeave={()=>{setCodeHash('')}}
                            onClick = {() => {
                                    copyCodeLinkOnClick(funcName)
                                    setCodeHash(funcName)
                                    }}>
                            🔗
                        </Button>
                    </div>

                
                )
            })
        }

        // return <Tab.Pane attached={false}>{functionButtonArea}</Tab.Pane>
        return functionButtonArea
        
    }

    return (
        <Resizable   
            defaultSize={{
                width:377,
                height:"calc(100vh - 44px)",
            }}
            className="informationBox"
            minWidth="400px"
            maxWidth="677px"
            enable={{ top:false, right:false, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            >

                <div className="template-code-breakdown">
                    {paneConstructor()}
                </div>

                <div className="template-info-cont">
                    {codeBlockDescription()}
                </div>
            </Resizable>
    )
}

const mapStateToProps = (state) => {
    return ({
        'functionSelected': state.appState['functionSelected'],
        'templateTagData': state.templateTags['data'],
        'menuOptions': state.vaultSessionMenuData['data'],
        'vaultMenuClicked': state.appState['menuClickedFlag'],
        'menuItemSelected': state.appState['menuIdSelected'],
        'functionList': state.templateTags['funcList'],
        'templateCode' : state.templateTags['templateCode']
    })
}

export default connect(mapStateToProps, { vaultFunctionClicked })(InformationBoxContainer)