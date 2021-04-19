import React, { useState, useRef, useEffect, createRef } from 'react';
import { Accordion, Icon, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vaultFunctionClicked } from '../../../actions'
import { useHistory } from 'react-router-dom';
import NavLinkBar from './decorator_component/navLinkBar'

const VaultTemplateDisplay = (props) => {
    let history = useHistory()
    const [popUp, setPopUp] = useState(false)
    const [activeAccordianIndex, setActiveAccordianIndex] = useState([0, 1])
    const templateCodeRef = useRef();
    let previousState;
    

    useEffect( () => {
        console.log('vaultTemplateDisplay useeffect for menuItemSelected is run' )
        if (props.templateCode != '') {
            if (history.location.hash === '') {
                props.vaultFunctionClicked('overall_descrip')
            } else {
                let functionId = history.location.hash.split("#")[1]
                if (functionId in props.functionList){
                    props.vaultFunctionClicked(functionId)
                    document.getElementById(functionId).scrollIntoView()
                }
            }
        }
    }, [props.menuItemSelected, props.functionList])

    const getActiveStatus = (mode, functionName) => {
        if (functionName == props.functionFocus) {
            if (mode === "code") {
                return 'codeBlock codeDiv highlighted'
            }
        } else {
            return 'codeBlock'
        }
    }

    const markTemplateCode = () => {
        let func_block_regex = new RegExp('^((private |public |friend |static )*function ([a-zA-Z1-9 ()_,]+)\n*?.*?\nend function.*?)', 'igms')
        let sub_block_regex = new RegExp('^((private |public |friend |static )*sub ([a-zA-Z1-9 ()_,]+)\n*?.*?\nend sub.*?)', 'igms')

        let func_title_regex = new RegExp('^(private |public |friend |static )*function ([a-zA-Z1-9 ()_,]+)', 'igms')
        let sub_title_regex = new RegExp('^(private |public |friend |static )*sub ([a-zA-Z1-9 ()_,]+)', 'igms')

        let all_code = [...props.templateCode.matchAll(sub_block_regex), ...props.templateCode.matchAll(func_block_regex)]
        let all_titles = [...props.templateCode.matchAll(func_title_regex), ...props.templateCode.matchAll(sub_title_regex)]

        console.log('all code ===>', all_code, 'all titles ===>', all_titles)

        let [split_code_sub, split_code_func] = props.templateCode.split(new RegExp('end sub', 'i'))
        split_code_func = split_code_func != null ? split_code_func.split(new RegExp('end function', 'i')) : ''
        split_code_sub = split_code_sub != null ? split_code_sub.split(new RegExp('end sub', 'i')) : ''

        let code = all_code.map((codeBlock) => {
            if (codeBlock !== '') {
                let codeBlockTitle = codeBlock[codeBlock.length - 1].split('(')[0]
                return (
                    <React.Fragment>
                        <div id={codeBlockTitle} className={getActiveStatus('code', codeBlockTitle)}>
                            <SyntaxHighlighter language='vba'>
                                {codeBlock}
                            </SyntaxHighlighter>
                        </div>
                    </React.Fragment>
                    
                )
            }
        })
        
        return code

    }

    const handleTitleClick = (index) => {
        let tmp_index
        if (activeAccordianIndex.includes(index)){
            activeAccordianIndex.splice(activeAccordianIndex.indexOf(index), 1)
            setActiveAccordianIndex([...activeAccordianIndex])
            
        } else {
            activeAccordianIndex.push(index)
            setActiveAccordianIndex([...activeAccordianIndex])
        }        
    }

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

    const linkBar = () => {
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

    const renderTemplateCode = () => {
        let split_code;
        if ((props.menuClicked !== '') || (props.templateCode)){
            if (props.templateCode !== '') {
                split_code = markTemplateCode()
                // previousTemplateCode = UsePrevious(props.templateCode)
            }
            
            return (
                <React.Fragment>
                    <NavLinkBar/>
                    {split_code}
                </React.Fragment>
            )

        } else {

            return null

        }
    }

    const displayCode = () => {

        return (

            <Accordion className="template-display-inner-cont">
                <Accordion.Title
                    onClick={() => handleTitleClick(1)}
                    active={activeAccordianIndex.includes(1)}
                    index={1}
                    className="menu-header-h1 menu-choice"
                >
                    <Icon name='dropdown' />
                    CODE
                </Accordion.Title>

                <Accordion.Content 
                    className="template-code-cont" 
                    active={activeAccordianIndex.includes(1)}>
                    {renderTemplateCode()}
                </Accordion.Content>
            </Accordion>
        )
        
    }

    return (
        <React.Fragment>
            <div className="macro-generator-container">
                {displayCode()}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        menuClicked : state.appState['menuClickedFlag'],
        templateCode : state.templateTags['templateCode'],
        vaultMenuClicked: state.appState['menuClickedFlag'],
        vaultid: state.appState['vaultid'],
        menuOptions: state.vaultSessionMenuData['data'],
        functionList: state.templateTags['data']['func_descrip'],
        functionFocus: state.appState['functionSelected'],
        menuItemSelected: state.appState['menuIdSelected']
    }
}
export default connect( mapStateToProps, { vaultFunctionClicked })(VaultTemplateDisplay);