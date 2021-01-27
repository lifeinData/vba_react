import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { modifyNodeProperty } from '../../actions/index'
import { Button, Checkbox, Form, Tab } from 'semantic-ui-react'
import PropertyAccord from '../nodePropertyBox/settingsAccordian'
import PropertyDescrip from '../nodePropertyBox/propertyDescrip'

class nodePropertyBox extends React.Component {
    // overall setup of the node property box
    componentDidMount () {
        document.querySelector('.property-menu a:nth-child(2)').classList.add("disabled")
    }

    componentDidUpdate() {
        if (this.props.nodeProperty == null) {
            document.querySelector('.property-menu a:nth-child(2)').classList.add("disabled")
        } else {
            document.querySelector('.property-menu a:nth-child(2)').classList.remove("disabled")
        }
    }

    getSettingPane = () => {
        if (this.props.nodeProperty == null) {
            return ( 
                <Tab.Pane></Tab.Pane>
            )
        }

        return (
            <Tab.Pane>
                <div style={{display:"flex"}}>
                    <PropertyAccord nodeProperty={this.props.nodeProperty}/>
                    <PropertyDescrip />
                </div>
            </Tab.Pane>
        )
    }
    getTabPanes = () => {
        const panes = [
            {
                menuItem: "About",

                render: () => <Tab.Pane>About this function</Tab.Pane>
            },
            {
                menuItem: 'Settings',
                render: () => this.getSettingPane()

            },
        ]

        return panes


    }

    render() {
        return (
            <React.Fragment>
                
                <Tab className="property-menu" menu={{ pointing: true, className: "node-prop tab-lbl" }} panes={this.getTabPanes()} />

            </React.Fragment>
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

export default connect(mapStateToProps, { modifyNodeProperty })(nodePropertyBox)