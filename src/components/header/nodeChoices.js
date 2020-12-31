import { findByLabelText } from '@testing-library/react';
import React from 'react';
import Muuri from 'muuri';
import { connect } from 'react-redux';
import { addNode, newNodeProperty } from '../../actions/index';
import NodePropertyBox from '../templates/nodePropertyBox'
import $, { data } from "jquery";

const nodeChoiceRenderMap = {
    'dq': ['dq1', 'dq2'],
    'columnModify': ['cm1', 'cm2'],
    'about': ['about1', 'about2']
};

let gridCanvas;
let gridNodeArea;
class Header extends React.Component {


    constructor(props) {
        super(props)
        if (this.props.selectedNode == '') {
            this.state = { itemMap: {}, fromOtherGrid: false, selectedNode: '', menuRendered: false, firstRender: true, muuriRender: false }
        }

    }

    // nodeChoiceRenders = () => {
    //     // let menuSelect = document.querySelector('.menu-btn.clicked')
    //     this.setState({nodeChoices:nodeChoiceRenderMap[this.props.selectedMenuOptn].map((e) => {
    //         return (
    //             <div className="grid-component comp1">
    //                 <div className="item-placeholder" >
    //                     <div className="item-content">
    //                         <button className="top-node ui primary basic button">
    //                             {e}
    //                         </button>
    //                     </div>
    //                 </div>
    //                 <div className="item" node-property="test2" >
    //                     <div className="item-content">
    //                         <button node-property="test2" className="top-node ui primary basic button">
    //                             {e}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     })}, () => {console.log('this worked')})
    //     // return 
    // }

    onTopNodeClick = (targetEl, isButton = true) => {
        // e.stopPropagation();
        let nodeSelected;
        if (isButton) {
            nodeSelected = targetEl.currentTarget.getAttribute('node-property')
            if (!(nodeSelected in this.props.nodeProperty)) {
                this.props.newNodeProperty(nodeSelected)
            }

            this.setState({ selectedNode: nodeSelected })
        } else {
            nodeSelected = targetEl.getAttribute('node-property')
            if (!(nodeSelected in this.props.nodeProperty)) {
                this.props.newNodeProperty(nodeSelected)
            }
            this.setState({ selectedNode: nodeSelected })
        }
    }

    initMuuri = () => {
        gridNodeArea.remove(document.querySelectorAll('.item'), { removeElements: true })
        // gridNodeArea.add(document.querySelectorAll('.item'))
    }

    initMuuriCanvas = () => {
        let cloneMap = {}

        gridCanvas = new Muuri('#drop-area', {
            dragEnabled: true,
            dragSort: function () {
                return [gridCanvas]
            }
        }).on('receive', (data) => {
            cloneMap[data.item._id] = {
                item: data.item,
                grid: data.fromGrid,
                index: data.fromIndex,
                fromOtherGrid: true
            }
        }).on('dragReleaseStart', (item) => {
            if (cloneMap[item._id].fromOtherGrid) {
                const nodeMap = gridCanvas.getItems().map((e) => { return e._element.getAttribute('node-property') })
                // this.setState({ fromOtherGrid: false })
                this.props.addNode(nodeMap)
                const cloneData = cloneMap[item._id]
                const cloneEl = cloneData.item.getElement().cloneNode(true)
                cloneEl.setAttribute('class', 'item');
                cloneEl.children[0].setAttribute('style', '');
                const items = cloneData.grid.add(cloneEl, { index: cloneData.index, active: true });
                cloneData.grid.show(items);
            }
        }).on('dragInit', (item) => {
            // console.log(item)
            this.onTopNodeClick(item._element, false)
        })

        gridNodeArea = new Muuri('.grid-container', {
            dragEnabled: true,
            dragSort: function () {
                return [gridCanvas]
            },
        }).on('dragInit', (item) => {
            this.onTopNodeClick(item._element, false)
        })

    }
    componentDidMount() {
        console.log('muuri activated')
        this.initMuuriCanvas()
        // this.initMuuri()
    }

    // componentDidUpdate() {
    //     this.initMuuri()
    // }
    getNodeChoices = () => {
        if (document.querySelector('.nodeContainer')) {
            document.querySelector('.nodeContainer').remove()
        }

        if (this.state.firstRender == false) {

            // if (document.querySelector('.nodeContainer')) {
            //     document.querySelector('.nodeContainer').remove()
            // }

            const nodeChoiceMap = nodeChoiceRenderMap[this.props.selectedMenuOptn].map((e) => {
                return (
                    <div className="nodeContainer">
                        <div className="grid-component comp1">
                            <div className="item-placeholder" >
                                <div className="item-content">
                                    <button className="top-node ui primary basic button">
                                        {e}
                                    </button>
                                </div>
                            </div>
                            <div className="item" node-property="test2" >
                                <div className="item-content">
                                    <button node-property="test2" className="top-node ui primary basic button">
                                        {e}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            return nodeChoiceMap
        }
    }

    render() {
        console.log('header loaded')
        // this.nodeChoiceRenders()
        return (
            <React.Fragment>

                <div id="drop-area">

                </div>
                {$("#drop-area").length !== 0 ? this.initMuuri() : ''}
                {/* {this.state.selectedNode !== '' ? <NodePropertyBox nodeClass={this.state.selectedNode} /> : ''} */}
            </React.Fragment>
        )
    }

    // render() {
    //     console.log('header loaded')
    //     // this.nodeChoiceRenders()
    //     return (
    //         <React.Fragment>
    //             <div className="grid-container">
    //                 {/* {this.state.menuRendered ? this.nodeChoiceRenders() : ''} */}
    //                 {this.getNodeChoices()}
    //                 {this.initMuuri()}
    //                 {/* {()} */}
    //                 {/* <div className="grid-component comp1">
    //                     <div className="item-placeholder" >
    //                         <div className="item-content">
    //                             <button className="top-node ui primary basic button">
    //                                 2
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div className="item" node-property="test2" >
    //                         <div className="item-content">
    //                             <button node-property="test2" className="top-node ui primary basic button">
    //                                 2
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="grid-component comp2">
    //                     <div className="item-placeholder" >
    //                         <div className="item-content">
    //                             <button node-property="inplace1" className="top-node ui primary basic button">
    //                                 1
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div className="item" node-property="test1">
    //                         <div className="item-content">                                
    //                             <button node-property="test1" className="top-node ui primary basic button">
    //                                     1
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div> */}
    //             </div>
    //             <div id="drop-area">

    //             </div>
    //             {/* {this.state.selectedNode !== '' ? <NodePropertyBox nodeClass={this.state.selectedNode} /> : ''} */}
    //         </React.Fragment>
    //     )
    // }
}

const mapStateToProps = (state) => {
    return ({
        mainFlowNodes: state.mainFlow,
        nodeProperty: state.nodeProperty,
        selectedNode: state.selectedNode,
        selectedMenuOptn: state.selectedMenuOptionReducer
    })
}

export default connect(mapStateToProps, { addNode, newNodeProperty })(Header);