import { Accordion, Icon, Button, Checkbox, Form, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import React from 'react';
import { mouseOverProperty, mouseOutOfProperty, modifyNodeProperty } from '../../actions'
import SettingsFields from './settingFields'

class settingsAccordian extends React.Component {
    //settings accordian that takes into the settings fields and property description
    constructor(props) {
        super(props)
        this.state = { activeIndex: [0] }
    }



    handleTitleClick = (e, titleProps) => {
        const index = titleProps.index
        const activeIndexAry = this.state.activeIndex

        if (activeIndexAry.includes(index)) {
            activeIndexAry.splice(activeIndexAry.indexOf(index))
            this.setState({ activeIndex: activeIndexAry })
        } else {
            // let activeIndexes = activeIndexAry.concat(index) 
            this.setState({ activeIndex: activeIndexAry.concat(index) })
        }

    }

    getSettingsAccord = () => {
        if (this.props.nodeProperty == null) {
            return (
                <Tab.Pane></Tab.Pane>
            )
        }

        return (

            <Accordion
                exclusive={false}
                fluid
                styled
                className=""
                style={{ width: "50%" }}
            >
                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    id="addColumn">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(0)}
                        index={0}
                        className="test-header"
                    >
                    
                    <Icon name='dropdown' />
                        Insert Columns
                    </Accordion.Title>
                    <Accordion.Content className="test-content" active={this.state.activeIndex.includes(0)}>
                        <SettingsFields nodeProperty={this.props.nodeProperty}/>
                    </Accordion.Content>
                </div>


                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    id="some Other Property">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(1)}
                        index={1}
                    >
                        <Icon name='dropdown' />
                    Insert Columns
                    </Accordion.Title>
                    <Accordion.Content active={this.state.activeIndex.includes(1)}>
                        Insert columns here
                    </Accordion.Content>
                </div>


            </Accordion>
        )
    }


    onMouseEnter = (e) => {
        // console.log(e)
        this.props.mouseOverProperty(e.target.parentNode.id)
    }

    onMouseLeave = (e) => {
        this.props.mouseOutOfProperty()
    }

    render() {
        return (
            this.getSettingsAccord()
        )

    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log(state, ownProps)
    // return { test: 'test' }
    if (ownProps.nodeProperty == null) {
        return { nodeProperties: null }
    } else {
        
        return { nodeProperties: state.mainFlowNodes[ownProps.nodeProperty] }
    }

}

export default connect(mapStateToProps, { mouseOverProperty, mouseOutOfProperty })(settingsAccordian);