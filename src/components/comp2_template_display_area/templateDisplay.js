import React from 'react';
import { connect } from 'react-redux';

import { parseTemplateRequest, parseTemplateOptions } from '../../actions/index';
import FunctionBreakdownBar from './template_display_sections/functionBreakdown';
import {Accordion, Icon} from 'semantic-ui-react';

class templateDisplay extends React.Component {
    constructor(props){
        super(props)
        this.props.parseTemplateRequest()
        this.props.parseTemplateOptions()
        console.log('templateDisplay is called')
        this.state = { activeIndex: [0,1]}
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

    parseTemplateCode = () => {
        let numColumnsToInsert = []
        let txtColumnsToInsert = []
        let numRegex = /<jsNumParse>/

        if (this.props.columnChoices.insertColumnFlag) {
            
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
                let replacedTemplate
                numColumnsToInsert = numColumnsToInsert.join(',')
                replacedTemplate = this.props.templateToDisplay.replace(numRegex, numColumnsToInsert)
                return (replacedTemplate === this.props.templateToDisplay ? this.props.templateToDisplay : replacedTemplate)
            }

        }

        return this.props.templateToDisplay

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

    render () {
        if (this.props.templateToDisplay != '') {
            
            return (
                <React.Fragment>
                    <Accordion className="inner-cont">
                        <Accordion.Title
                            onClick={this.handleTitleClick}
                            active={this.state.activeIndex.includes(0)}
                            index={0}
                            className="menu-header-h1 noselect"
                        >
                            <Icon name='dropdown' />
                            Template Code Function(s)
                        </Accordion.Title>
                        <Accordion.Content style={{paddingBottom: '0px'}} active={this.state.activeIndex.includes(0)}>
                            <FunctionBreakdownBar />
                        </Accordion.Content>
                        
                        <Accordion.Title
                            onClick={this.handleTitleClick}
                            active={this.state.activeIndex.includes(1)}
                            index={1}
                            className="menu-header-h1 noselect"
                        >
                            <Icon name='dropdown' />
                            Code
                        </Accordion.Title>

                        <Accordion.Content style={{marginLeft: "7px", height: '100%', maxHeight: 'calc(100vh - 251px)', overflow: 'auto'}} active={this.state.activeIndex.includes(1)}>
                            <pre>                                
                                <code className="vba" >
                                    {this.parseTemplateCode()}
                                </code>
                            </pre> 

                            {/* <div style={{border:"2px black solid"}}>
                            </div> */}
                        </Accordion.Content>

                    </Accordion>
                </React.Fragment>
            )
        }
        return (null)
    }
}


const mapStateToProps = (state) => {
    return ({
        templateToDisplay: state.templateCodeInfo.template_code,
        highlightCodeSelection: state.highlightCodeSelection,
        columnChoices: state.columnChoices
    })
}

export default connect(mapStateToProps, {parseTemplateRequest, parseTemplateOptions}) (templateDisplay)