// import { fromPairs } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { addNodeToFlow, parseTemplateOptions } from '../../actions/index';
import hljs from 'highlight.js';
import hljsVba from 'highlight.js/lib/languages/vba';
import 'highlight.js/styles/github.css';
import TemplateDisplay from '../comp2_template_display_area/templateDisplay';
import ConfigInfoBox from '../comp3_config_info_box'
import TemplateChoicesBox from '../comp1_template_choices'
import { HashRouter, NavLink } from 'react-router-dom';

// console.log(hljs)


const nodeChoiceRenderMap = {
    'dq': [{abbrev:'dqNum', full:'Numeric DQ Report'}, {abbrev:'dqCate', full:'Categorical DQ Report'}],
    'columnModify': [{abbrev:'colMod', full:'Column Modify Filler'}],
    'about': [{abbrev:'about', full:'about Filler'}]
};

class MainMenu extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = { 'menuClicked': false, 'prevEl': null, 
        'reportNodeChoices': this.getNodeChoices('dq'), 'columnModNodeChoices': null, 
        'selectMenu': 'about', 'dropAreaNodes': [], 'selectedNode': null, 'renderTemplateFlag':false}
        // hljs.initHighlightingOnLoad();
        hljs.registerLanguage("vba", hljsVba);
        
    }

    menuClick = (e) => {
        if (this.state.prevEl !== e.target && this.state.prevEl !== '') {
            this.state.prevEl.classList.remove('clicked')
            e.target.classList.add("clicked")
            this.setState({ 'prevEl': e.target, 'selectMenu': e.target.getAttribute('topic') }, () => { this.getNodeChoices(this.state.selectMenu) })

        }
    }

    selectNodeOnCanvas = (e) => {
        let uniqueID = e.target.getAttribute('id')
        this.setState({ selectedNode: uniqueID })
    }

    nodeClickFromMenu = (e) => {
        let uniqueID = Math.floor(Math.random() * 100000) + Math.random().toString(36).substr(2, 5)
        let nodeProperty = e.target.getAttribute('node-property')
        const initialNodeProp = {}
        uniqueID = nodeProperty + "-" + String(uniqueID)
        initialNodeProp[uniqueID] = {} //initilize an empty node property object

        let nodes =
            <div key={uniqueID} className="node-item onCanvas">
                <button id={uniqueID} onClick={this.selectNodeOnCanvas} node-property={nodeProperty} className="top-node ui primary basic button">
                    {nodeProperty}
                </button>
            </div>

        let newNodes = this.state.dropAreaNodes.concat(nodes)
        this.setState({ dropAreaNodes: newNodes })
        this.props.addNodeToFlow(initialNodeProp)
    }

    onClickGetTemplateCode = () => {
        if (this.state.renderTemplateFlag){
            return <TemplateDisplay/>
        }
    }

    getNodeChoices = (selectMenu = 'about', firstRender = false) => {
        return nodeChoiceRenderMap[selectMenu].map((e) => {
            return (
                <p key={e['abbrev']} onClick={this.nodeClickFromMenu} node-property={e['abbrev']} className="node-item">
                    {e['full']}
                </p>
            )
        })
    }

    componentDidMount() {
        
        this.setState({ 'prevEl': document.querySelector('.menu-btn.clicked') }, () => { this.getNodeChoices('about', true) })
    }

    render() {
        return (
            <React.Fragment>
                <div id="main-app-layout">
                    <TemplateChoicesBox />

                    <div className="macro-generator-container">
                        <TemplateDisplay />
                        {/*                         
                        <HashRouter basename="/templateCode/" children={}>

                        </HashRouter>
                        <HashRouter basename="/test1/" children={<div>hello</div>}>

                        </HashRouter> */}
                    </div>
                    
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

export default connect(mapStateToProps, { addNodeToFlow, parseTemplateOptions })(MainMenu);