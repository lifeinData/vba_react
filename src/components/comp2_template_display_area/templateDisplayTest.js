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
    }
    
    render () {
        console.log('the template id is ', this.props.templateid)
        return (
            <React.Fragment>
                <div className="macro-generator-container">
                    hello
                    
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return ({
        templateCodeInfo: state.templateCodeInfo.template_func_description,
        templateToDisplay: state.templateCodeInfo.template_code,
        highlightCodeSelection: state.funcInfoSelected.funcTitle,
        columnChoices: state.columnChoices,
        templateChoiceClicked: state.templateChoice.templateChoiceClicked,
        templateChoiceID: state.templateChoice.templateID,
    })
}

export default connect(mapStateToProps, {parseTemplateRequest, parseTemplateOptions}) (templateDisplay)