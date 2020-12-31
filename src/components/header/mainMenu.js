import { fromPairs } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { selectMenu } from '../../actions/index';
import NodeCanvas from './nodeChoices';
import Muuri from 'muuri';

const nodeChoiceRenderMap = {
    'dq': ['dq1', 'dq2'],
    'columnModify': ['cm1', 'cm2'],
    'about': ['about1', 'about2']
};

class MainMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 'menuClicked': false, 'prevEl': null, 'nodeChoices': null, 'selectMenu': 'about' }
    }

    menuClick = (e) => {
        if (this.state.prevEl !== e.target && this.state.prevEl !== '') {
            this.state.prevEl.classList.remove('clicked')
            e.target.classList.add("clicked")
            this.setState({ 'prevEl': e.target, 'selectMenu': e.target.getAttribute('topic') }, () => { this.getNodeChoices(this.state.selectMenu) })
            
        }
    }

    getNodeChoices = (selectMenu = 'about', firstRender=false) => {
        console.log(this.state.selectMenu)
        let randomNum = String(Math.random())
        let nodeChoiceMap = nodeChoiceRenderMap[selectMenu].map((e) => {
            return (
                <div id = {randomNum} className="item" node-property="test2" >
                    <div className="item-content">
                        <button node-property="test2" className="top-node ui primary basic button">
                            {e}
                        </button>
                    </div>
                </div>
            )
        })
        
        if (firstRender) {
            this.setState({ 'nodeChoices': nodeChoiceMap }, () => {this.initMuuriCanvas()})
        } else {
            this.setState({ 'nodeChoices': nodeChoiceMap }, () => {
                console.log(nodeChoiceRenderMap[selectMenu])
                console.log(nodeChoiceMap)})
        }
        
        

        // return nodeChoiceMap
    }

    componentDidMount() {
        this.setState({ 'prevEl': document.querySelector('.menu-btn.clicked') }, () => { this.getNodeChoices('about', true) })
    }

    initMuuriCanvas = () => {
        let cloneMap = {}

        let gridCanvas = new Muuri('#drop-area', {
            dragEnabled: true,
            dragSort: function () {
                return [gridCanvas]
            }
        }).on('receive', (data) => {
            if (cloneMap[data.item._id]){
                delete cloneMap[data.item._id]
            }
            cloneMap[data.item._id] = {
                item: data.item,
                grid: data.fromGrid,
                index: data.fromIndex,
                fromOtherGrid: true
            }
        }).on('dragReleaseStart', (item) => {
            let cloneData = cloneMap[item._id]
            if (cloneMap[item._id]) {
                delete cloneMap[item._id]
                const nodeMap = gridCanvas.getItems().map((e) => { return e._element.getAttribute('node-property') })                
                // const cloneData = cloneMap[item._id]
                const cloneEl = cloneData.item.getElement().cloneNode(true)
                cloneEl.setAttribute('class', 'item');
                cloneEl.children[0].setAttribute('style', '');

                let items = cloneData.grid.add(cloneEl, {active: true });
                // cloneData.grid.show(items);

                // this.props.addNode(nodeMap)
            }
        })

        // .on('dragInit', (item) => {
        //     // console.log(item)
        //     this.onTopNodeClick(item._element, false)
        // })
        let gridNodeArea = new Muuri('.grid-container', {
            dragEnabled: true,
            dragSort: function () {
                return [gridCanvas]
            },
        })

        // .on('dragInit', (item) => {
        //     this.onTopNodeClick(item._element, false)
        // })

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
                <h1>{this.state.selectMenu}</h1>
                {this.state.nodeChoices}
                <div id="drop-area">

                </div>
                {this.state.nodeChoices}
                {/* {this.state.nodeChoices !== null ? <NodeCanvas /> : ''} */}

            </React.Fragment>

        )
    }
}


export default connect(null, { selectMenu })(MainMenu);