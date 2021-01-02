import { fromPairs } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { modifyNodeProperty,  addNodeToFlow } from '../../actions/index';
import NodeCanvas from './nodeChoices';
import Muuri from 'muuri';
import NodePropertyBox from '../templates/nodePropertyBox';

const nodeChoiceRenderMap = {
    'dq': ['dq1', 'dq2'],
    'columnModify': ['cm1', 'cm2'],
    'about': ['about1', 'about2']
};

class MainMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 'menuClicked': false, 'prevEl': null, 'nodeChoices': null, 'selectMenu': 'about', 'dropAreaNodes': [], 'selectedNode': null}
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
        this.setState({selectedNode: uniqueID})
    }

    nodeClickFromMenu = (e) => {
        let uniqueID = Math.floor(Math.random() * 100000) + Math.random().toString(36).substr(2, 5)
        let nodeProperty = e.target.getAttribute('node-property')
        const initialNodeProp = {}
        uniqueID = nodeProperty + "-" + String(uniqueID)
        initialNodeProp[uniqueID] = {} //initilize an empty node property object
        
        let nodes =
            <div key={uniqueID} className="node-item onCanvas">
                <button id={uniqueID}  onClick={this.selectNodeOnCanvas} node-property={nodeProperty} className="top-node ui primary basic button">
                    {nodeProperty}
                </button>
            </div>
        
        let newNodes = this.state.dropAreaNodes.concat(nodes)
        this.setState({ dropAreaNodes: newNodes})
        console.log('this is the intial node prop', initialNodeProp)
        this.props.addNodeToFlow(initialNodeProp)
    }

    getNodeChoices = (selectMenu = 'about', firstRender = false) => {
        let nodeChoiceMap = nodeChoiceRenderMap[selectMenu].map((e) => {
            // let nodeProp = e + "-prop"
            return (
                <div key={e} className="node-item">
                    <button  onClick={this.nodeClickFromMenu} node-property={e} className="top-node ui primary basic button">
                        {e}
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
                    </div>
                    <div id="node-property-container">
                        {this.state.selectedNode !== null ? <NodePropertyBox nodeProperty={this.state.selectedNode} />: ''}
                    </div>
                    <div id="macro-generator-container">
                    </div>
                </div>
                {/* <div id="drop-area">
                    
                </div>
                {this.state.selectedNode !== null ? <NodePropertyBox nodeProperty={this.state.selectedNode} />: ''} */}

            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return ({mainFlowNodes: state.mainFlowNodes})
}
export default connect(null, { addNodeToFlow, modifyNodeProperty })(MainMenu);