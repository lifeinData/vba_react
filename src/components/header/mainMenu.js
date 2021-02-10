// import { fromPairs } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { addNodeToFlow, parseNodeRequest } from '../../actions/index';
import NodePropertyBox from '../templates/nodePropertyBox';
import { Button } from 'semantic-ui-react';
import hljs from 'highlight.js';
import hljsVba from 'highlight.js/lib/vba';
import 'highlight.js/styles/github.css';
import ColumnSettingDropdown from '../column_settings/sectionDropDown';
import TemplateDisplay from '../template_display_area/templateDisplay';
import { Resizable } from "re-resizable";

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
        'selectMenu': 'about', 'dropAreaNodes': [], 'selectedNode': null, 'renderTemplateFlag':false }
        hljs.initHighlightingOnLoad();
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
                <div id="node-area-layout">
                    <div className="templateChoices">
                        <p topic="dq" className="menu-header-h1">Data Quality</p>
                            {this.state.reportNodeChoices}
                        <p topic="columnModify" className="menu-header-h1">Column Modification</p>
                        <p topic="about" className="menu-header-h1">About</p>
                        
                        <p className="menu-header-h1" onClick={() => {this.setState({renderTemplateFlag:true})}}>
                            SUBMIT
                        </p>

                    </div>
                    
                    <div className="macro-generator-container">
                        {this.onClickGetTemplateCode()}
                    </div>
                    
                    <Resizable 
                        className="informationBox"
                        minWidth="344"
                        maxWidth="677"
                        enable={{ top:false, right:false, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
                    >
                        {/* <div className="informationBox"> */}

                            <div className="template-info-cont">
                                <p topic="dq" className="menu-header-h1">ABOUT THIS TEMPLATE</p>
                            {/*ABOUT THIS TEMPLATE 
                            USAGE INFORMATION
                            ERROR CHECKS
                            REPORT SAMPLE
                            */}
                            </div>

                            <div className="template-targetcol-cont">
                                <ColumnSettingDropdown />
                            </div>

                            <div className="template-history-cont">

                            </div>
                        {/* </div> */}
                    </Resizable>
                   
                
                </div>

                {/* <div id="top-main-menu">
                    <p topic="dq" onClick={this.menuClick} className="menu-btn">Data Quality</p>
                    <p topic="columnModify" onClick={this.menuClick} className="menu-btn">Column Modification</p>
                    <p topic="about" onClick={this.menuClick} className="menu-btn clicked">About</p>
                </div>
                <div className="grid-container">
                    {this.state.nodeChoices}
                </div>
                <div id="node-area-layout">
                    <div id="drop-area-container">
                        {this.state.dropAreaNodes}

                        <Button onClick={this.onClickParseCanvasNodes}>
                            Submit
                        </Button>

                    </div>

                    <div id="node-property-container">
                        <NodePropertyBox nodeProperty={this.state.selectedNode} />
                    </div>

                    <div id="macro-generator-container" >
                        <pre>
                            <code className="vba" >
                                {this.props.parsedNodeMacro}
                            </code>
                        </pre>

                    </div>
                </div> */}

            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return ({
        mainFlowNodes: state.mainFlowNodes,
        parsedNodeMacro: state.parsedNodeMacro
    })
}

export default connect(mapStateToProps, { addNodeToFlow, parseNodeRequest })(MainMenu);