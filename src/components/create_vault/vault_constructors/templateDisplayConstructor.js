import React, { useState, useRef, useEffect, createRef } from 'react';
import { Accordion, Icon, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vaultFunctionClicked } from '../../../actions'
// import {  } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function UsePrevious (value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    
    return ref.current;

}

const VaultTemplateDisplay = (props) => {
    let history = useHistory()
    const [codeLoaded, setCodeLoaded] = useState(false)
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
                if (props.functionList.includes(functionId)){
                    props.vaultFunctionClicked(functionId)
                    
                    document.getElementById(functionId).scrollIntoView()
                }
            }
        }
    }, [props.menuItemSelected, props.functionList])

    const getActiveStatus = (mode, functionName) => {
        if (functionName == props.functionFocus) {
            if (mode === "code") {
                return 'codeDiv highlighted'
            } else if (mode === "function") {
                return 'active'
            }
            
        }
    }

    const markTemplateCode = () => {
        let [split_code_sub, split_code_func] = props.templateCode.split(new RegExp('end sub', 'i'))
        let [subRegex, funcRegex] = [/Sub (\w+)(?=[()])/, /Function (\w+)(?=[()])/]
        split_code_func = split_code_func != null ? split_code_func.split(new RegExp('end function', 'i')) : ''
        split_code_sub = split_code_sub != null ? split_code_sub.split(new RegExp('end sub', 'i')) : ''
        let split_code = [...split_code_sub, ...split_code_func]
        let anchorName;
        

        let code = split_code.map((codeBlock) => {
            if (codeBlock !== '') {
                if (subRegex.test(codeBlock)) {
                    codeBlock = codeBlock.trim() + "\nEnd Sub"
                    anchorName = codeBlock.match(subRegex)[1]

                } else if (funcRegex.test(codeBlock)) {
                    codeBlock = codeBlock.trim() + "\nEnd Function"
                    anchorName = codeBlock.match(funcRegex)[1]
                }
                
                return (
                    <React.Fragment>
                        {/* <a id={anchorName}></a> */}

                        <div id={anchorName} className={getActiveStatus('code', anchorName)}>
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

    const renderTemplateCode = () => {
        let split_code;
        if ((props.menuClicked !== '') || (props.templateCode)){
            if (props.templateCode !== '') {
                split_code = markTemplateCode()
                // previousTemplateCode = UsePrevious(props.templateCode)
            }
            
            return split_code
        } else {
            return null
        }
    }
    const renderFunctions = () => {
        if ((props.menuOptions !== '') && (props.vaultMenuClicked === '') && (props.templateCode == '')){
            return (
                // make this look better
                <Alert variant="dark">
                    Click on a template to the left to see its code and function breakdown 
                </Alert>
            )
        } else if (((props.menuItemSelected !== '') && (props.functionList !== '')) || (props.templateCode != '')) {
            let functionButtonArea;
            functionButtonArea = props.functionList.map( (funcName) => {
                    return (
                        <Button
                        basic
                        color="blue"
                        onClick={() => {
                            document.getElementById(funcName).scrollIntoView()
                            props.vaultFunctionClicked(funcName)
                            history.push('#'+ funcName)}}
                            className={getActiveStatus('function', funcName)}>
                            {funcName}
                        </Button>
                    
                    )
                }
                
            )

            functionButtonArea.splice(0, 0,
                    <Button  
                        basic
                        color="blue"
                        onClick={() => {
                            props.vaultFunctionClicked("overall_descrip")}}
                        className={getActiveStatus('function', 'overall_descrip')}>
                        Overall Description
                    </Button>
            )

            

            return functionButtonArea
        }

        return null
        
    }

    const displayCode = () => {

        return (

            <Accordion className="template-display-inner-cont">
                <Accordion.Title
                    onClick={() => handleTitleClick(0)}
                    active={activeAccordianIndex.includes(0)}
                    index={0}
                    className="menu-header-h1 menu-choice"
                >
                    <Icon name='dropdown' />
                    TEMPALTE CODE FUNCTION(S)

                </Accordion.Title>
                <Accordion.Content 
                    style={{paddingBottom: '0px'}} 
                    active={activeAccordianIndex.includes(0)}>
                    <div className="template-function-break-cont">
                        {renderFunctions()}
                    </div>

                </Accordion.Content>
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
        functionList: state.templateTags['funcList'],
        functionFocus: state.appState['functionSelected'],
        menuItemSelected: state.appState['menuIdSelected']
    }
}
export default connect( mapStateToProps, { vaultFunctionClicked })(VaultTemplateDisplay);