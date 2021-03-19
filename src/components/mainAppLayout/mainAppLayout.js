// import { fromPairs } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { parseTemplateOptions } from '../../actions/index';
import 'highlight.js/styles/github.css';
import TemplateDisplay from '../comp2_template_display_area/templateDisplay';
import ConfigInfoBox from '../comp3_config_info_box'
import TemplateChoicesBox from '../comp1_template_choices'


// console.log(hljs)


const nodeChoiceRenderMap = {
    'dq': [{abbrev:'dqNum', full:'Numeric DQ Report'}, {abbrev:'dqCate', full:'Categorical DQ Report'}],
    'columnModify': [{abbrev:'colMod', full:'Column Modify Filler'}],
    'about': [{abbrev:'about', full:'about Filler'}]
};

class MainMenu extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div id="main-app-layout-defunct">
                    <TemplateChoicesBox />
                    <TemplateDisplay templateid={this.props.match.params.id}/>
                    <ConfigInfoBox />
                </div>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return ({
        mainFlowNodes: state.mainFlowNodes,
        templateToDisplay: state.templateCodeInfo.template_code,
    })
}

export default connect(mapStateToProps, { parseTemplateOptions })(MainMenu);