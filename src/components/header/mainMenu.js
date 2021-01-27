// import { fromPairs } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { addNodeToFlow, parseNodeRequest } from '../../actions/index';
import NodePropertyBox from '../templates/nodePropertyBox';
import { Button } from 'semantic-ui-react';
import hljs from 'highlight.js';
import hljsVba from 'highlight.js/lib/vba';
import 'highlight.js/styles/github.css';
// console.log(hljs)


const nodeChoiceRenderMap = {
    'dq': [{abbrev:'dqNum', full:'Numeric DQ Report'}, {abbrev:'dqCate', full:'Categorical DQ Report'}],
    'columnModify': [{abbrev:'colMod', full:'Column Modify Filler'}],
    'about': [{abbrev:'about', full:'about Filler'}]
};

class MainMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 'menuClicked': false, 'prevEl': null, 'nodeChoices': null, 'selectMenu': 'about', 'dropAreaNodes': [], 'selectedNode': null }
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
        console.log('this is the intial node prop', initialNodeProp)
        this.props.addNodeToFlow(initialNodeProp)
    }

    onClickParseCanvasNodes = () => {
        this.props.parseNodeRequest()
        // console.log('this is the parsed node macro', this.props.parsedNodeMacro)
    }

    getNodeChoices = (selectMenu = 'about', firstRender = false) => {
        let nodeChoiceMap = nodeChoiceRenderMap[selectMenu].map((e) => {
            // let nodeProp = e + "-prop"
            return (
                <div key={e['abbrev']} className="node-item">
                    <button onClick={this.nodeClickFromMenu} node-property={e['abbrev']} className="top-node ui primary basic button">
                        {e['full']}
                    </button>
                </div>
            )
        })


        this.setState({ 'nodeChoices': nodeChoiceMap })
    }

    componentDidMount() {
        
        this.setState({ 'prevEl': document.querySelector('.menu-btn.clicked') }, () => { this.getNodeChoices('about', true) })
    }

    render() {
        return (
            <React.Fragment>
                <div id="top-main-menu">
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
                </div>

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