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
        this.state = { activeIndex: [0,1], syntaxHighlighted: false, observer: null}
    }

    componentDidMount(){
        // 
        // document.querySelectorAll("pre code").forEach(block => {
        //     hljs.highlightBlock(block);
        //   });
    }

    componentDidUpdate(){
        // document.querySelectorAll("pre code").forEach(block => {
        //     // hljs.highlightBlock(block);
        //     console.log(block)
        //     hljs.highlightBlock(block);
        //   });

        // console.log(document.querySelectorAll("pre code"))
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

    isSectionSelected = (mode, funcBlock) => {
    //     // let captureRegex = /Function (\w+)/

    //     // for (let [ind, func] of split_code.entries()) {
    //     //     let capture = func.match(captureRegex)

    //     //     if (capture != null) {
    //     //         capture = capture[1]
    //     //     } else {
    //     //         capture = ''
    //     //     }
        let captureRegex = /Function (\w+)/
        let capture = funcBlock.match(captureRegex)

        if (capture != null) {
            capture = capture[1]
            if (this.props.highlightCodeSelection == capture) {
                return 'codeDiv highlighted'
            }
        }

        return 'codeDiv'
        
    }

    markTemplateCode = (templateCodeToSplit) => {
    
        let split_code = templateCodeToSplit.split('End Function')
        let code = split_code.map((el, ind) => {

                            return (
                                <div className={this.isSectionSelected('func', el)}>
                                    <a id = {ind}></a>
                                    <SyntaxHighlighter language='vba'>
                                        {el.trim() + "\nEnd Function"}
                                        {/* {""} */}
                                        
                                    </SyntaxHighlighter>
                                </div>
                            )
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
    
            return this.markTemplateCode(this.props.templateToDisplay)

        } else {
            return ''
        }
    }

    // configureMutationObserver = () => {
    //     let targetNode =  document.getElementById("code-block")
    //     let config = {attributes: true}
    //     this.setState({observer : new MutationObserver(this.highlightVBA)}, ()=>{this.state.observer.observe(targetNode, config)} ) 
        
    // }

    highlightVBA = (mutationsList) => {
        // console.log(mutationsList)
        // if (this.props.templateToDisplay != null) {
        //     hljs.initHighlighting.called = false;
        //     hljs.initHighlighting();
        //     hljs.registerLanguage("vba", hljsVba);
        // }
    }

    // parseTemplateCode = () => {
    //     // let split_code = this.props.templateToDisplay.split('End Function')
    //     let split_code = [1,2,3,4,5]
    //     // let section_together = []
    //     // let captureRegex = /Function (\w+)/

    //     // for (let [ind, func] of split_code.entries()) {
    //     //     let capture = func.match(captureRegex)

    //     //     if (capture != null) {
    //     //         capture = capture[1]
    //     //     } else {
    //     //         capture = ''
    //     //     }

    //     let code = split_code.map((el, ind) => {
    //         return (<div key={ind} className={this.props.highlightCodeSelection}>
    //             {el}
    //             {"\n"}
    //             {this.props.highlightCodeSelection}
    //             End Function
    //         </div>)
    //     })


    
    //     return (
                                    

    //             code
            
    //     )

    // }

    renderParts = (sectionType) => {
        if (this.props.templateChoiceClicked) {
            if (sectionType == 'func'){
                return <FunctionBreakdownBar />
            } else if (sectionType == 'vba') {
                
                return (
                        this.parseTemplateCode()
                    )
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

    render () {
            return (
                <React.Fragment>
                    <Accordion className="template-display-inner-cont">
                        <Accordion.Title
                            onClick={this.handleTitleClick}
                            active={this.state.activeIndex.includes(0)}
                            index={0}
                            className="menu-header-h1 menu-choice"
                        >
                            <Icon name='dropdown' />
                            TEMPALTE CODE FUNCTION(S)
                        </Accordion.Title>
                        <Accordion.Content style={{paddingBottom: '0px'}} active={this.state.activeIndex.includes(0)}>
                            
                            {this.renderParts('func')}
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

                        <Accordion.Content className="template-code-cont" active={this.state.activeIndex.includes(1)}>
                            {this.renderParts('vba')}
                        </Accordion.Content>

                    </Accordion>
                </React.Fragment>
            )
    }
}


const mapStateToProps = (state) => {
    return ({
        templateToDisplay: state.templateCodeInfo.template_code,
        highlightCodeSelection: state.funcInfoSelected,
        columnChoices: state.columnChoices,
        templateChoiceClicked: state.templateChoice.templateChoiceClicked
    })
}

export default connect(mapStateToProps, {parseTemplateRequest, parseTemplateOptions}) (templateDisplay)