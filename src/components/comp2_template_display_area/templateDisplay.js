import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap'
import { parseTemplateRequest, parseTemplateOptions } from '../../actions/index';
import FunctionBreakdownBar from './template_display_sections/functionBreakdown';
import {Accordion, Icon} from 'semantic-ui-react';
import hljs from 'highlight.js';
// import hljsVba from 'highlight.js/lib/vba';
import 'bootstrap/dist/css/bootstrap.min.css';
import SyntaxHighlighter from 'react-syntax-highlighter';

class templateDisplay extends React.Component {
    constructor(props){
        super(props)
        // hljs.registerLanguage("vba", hljsVba);
        // this.props.parseTemplateOptions()
        this.state = {activeIndex: [0,1], syntaxHighlighted: false}
        this.codeLoaded = false
        this.validTemplateCode = false
    }
    
    triggerFunctionBreak = () => {
        if ((!(this.state.codeLoaded)) && (this.props.templateToDisplay != null)) {
            this.setState({codeLoaded : true})
        }
    }


    handleTitleClick = (e, titleProps) => {
        const index = titleProps.index
        const activeIndexAry = this.state.activeIndex

        if (activeIndexAry.includes(index)) {
            activeIndexAry.splice(activeIndexAry.indexOf(index), 1)
            this.setState({ activeIndex: activeIndexAry })
        } else {
            this.setState({ activeIndex: activeIndexAry.concat(index) })
        }

    }

    getHighlightStatus = (capture) => {
        if (this.props.highlightCodeSelection.includes(capture)) {
            return 'section'
        }
        
        return ''
    }

    isSectionSelected = (funcBlock) => {
        let captureRegexFunc = /Function (\w+)/
        let captureRegexSub = /Sub (\w+)/
        let capture

        if (funcBlock.match(captureRegexFunc)) {
                capture = funcBlock.match(captureRegexFunc)
            }
        else {
                capture = funcBlock.match(captureRegexSub)
            }
        

        if (capture != null) {
            capture = capture[1]
            if (this.props.highlightCodeSelection == capture) {
                return 'codeDiv highlighted'
            }
        }

        return 'codeDiv'
        
    }

    markTemplateCode = (templateCodeToSplit) => {
        let [split_code_sub, split_code_func] = templateCodeToSplit.split(new RegExp('end sub', 'i'))
        split_code_func = split_code_func != null ? split_code_func.split(new RegExp('end function', 'i')) : ''
        let split_code = [split_code_sub, ...split_code_func]
        let functionIdAry = Object.keys(this.props.templateCodeInfo)
        functionIdAry.splice(functionIdAry.indexOf('overall_descrip'), 1)
        let code = split_code.map((el, ind) => {
                            if (el != '') {
                                // detect if it's a sub or function
                                let capture_regex_sub = /sub (\w+)/
                                let codeSection 
                                if (el.toLowerCase().match(capture_regex_sub)){
                                    codeSection = el.trim() + "\nEnd Sub"     
                                } else {
                                    codeSection = el.trim() + "\nEnd Function"    
                                }

                                return (
                                    <React.Fragment>
                                        <a id = {functionIdAry[ind]}></a>
                                        <div className={this.isSectionSelected(el)}>
                                            
                                            <SyntaxHighlighter language='vba'>
                                                {codeSection}                                                
                                            </SyntaxHighlighter>
                                        </div>
                                    </React.Fragment>
    
                                )
                            }

                        }
                    )

        return code
    }

    parseTemplateCode = () => {
        if (this.props.templateToDisplay != null) {

            let numColumnsToInsert = []
            let txtColumnsToInsert = []
            let numRegex = /<jsNumParse>/
            let txtRegex = /<jsTxtParse>/
            if (this.props.columnChoices.insertColumnFlag) {
                let replacedTemplate
    
                for (let [colName, colType] of Object.entries(this.props.columnChoices)){
                    if (colName != 'insertColumnFlag'){
                        if (colType == 'num'){
                            numColumnsToInsert.push("'" + colName + "'")
                        } else if (colType == 'txt'){
                            txtColumnsToInsert.push("'" + colName + "'")
                        }
                    }
                }
                
                if (numColumnsToInsert.length > 0) {
                    numColumnsToInsert = numColumnsToInsert.join(',')
                    replacedTemplate = this.props.templateToDisplay.replace(numRegex, numColumnsToInsert)
                    
                }
    
                if (txtColumnsToInsert.length > 0) {
                    txtColumnsToInsert = txtColumnsToInsert.join(',')
                    replacedTemplate = this.props.templateToDisplay.replace(txtRegex, numColumnsToInsert)
                    
                }
    
                return (replacedTemplate === this.props.templateToDisplay ? this.markTemplateCode(this.props.templateToDisplay) : this.markTemplateCode(replacedTemplate))
            }
            
            return (
                <React.Fragment>

                    <a id="overall_descrip"></a>
                    {this.markTemplateCode(this.props.templateToDisplay)}
                </React.Fragment>
            )


        } else {
            return ''
        }
    }

    renderParts = (sectionType) => {
        if (this.props.templateChoiceClicked) {
            if (sectionType == 'func'){
                    return <FunctionBreakdownBar />
                    
            } else if ((sectionType == 'vba')) {
                let templateCode = this.parseTemplateCode()
                if ( templateCode != ''){
                    this.validTemplateCode = true
                    return templateCode
                }
            }

            
        }
        
        if (sectionType == 'vba') {
            return (
                <Alert variant="dark">
                    Click on a template to the left to see its code and function breakdown 
                </Alert>
            )
        }
        return null
        
    }

    triggerUpdate = () => {
        if ((this.codeLoaded == false) && (this.props.templateToDisplay != null) && (this.validTemplateCode)) {
            this.codeLoaded = true
            this.forceUpdate()
        }
    }

    render () {
            return (
                <React.Fragment>
                    <Accordion className="template-display-inner-cont">




                        <Accordion.Content className="template-code-cont" active={this.state.activeIndex.includes(1)}>
                            {this.renderParts('vba')}
                                                        
                        </Accordion.Content>

                        <Accordion.Title
                            onClick={this.handleTitleClick}
                            active={this.state.activeIndex.includes(1)}
                            index={1}
                            className="menu-header-h1 menu-choice"
                        >
                            <Icon name='dropdown' />
                            CODE
                        </Accordion.Title>

                        <Accordion.Content style={{paddingBottom: '0px'}} active={this.state.activeIndex.includes(0)}>
                            {this.renderParts('func')}
                        </Accordion.Content>
                        
                        <Accordion.Title
                            onClick={this.handleTitleClick}
                            active={this.state.activeIndex.includes(0)}
                            index={0}
                            className="menu-header-h1 menu-choice"
                        >
                            <Icon name='dropdown' />
                            TEMPALTE CODE FUNCTION(S)
                        </Accordion.Title>
                    </Accordion>
                </React.Fragment>
            )
    }
}


const mapStateToProps = (state) => {
    return ({
        templateCodeInfo: state.templateCodeInfo.template_func_description,
        templateToDisplay: state.templateCodeInfo.template_code,
        highlightCodeSelection: state.funcInfoSelected,
        columnChoices: state.columnChoices,
        templateChoiceClicked: state.templateChoice.templateChoiceClicked
    })
}

export default connect(mapStateToProps, {parseTemplateRequest, parseTemplateOptions}) (templateDisplay)