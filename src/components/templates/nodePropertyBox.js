import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { modifyNodeProperty } from '../../actions/index'
import { Button, Checkbox, Form, Tab } from 'semantic-ui-react'
import PropertyAccord from '../nodePropertyBox/settingsAccordian'
import PropertyDescrip from '../nodePropertyBox/propertyDescrip'

class nodePropertyBox extends React.Component {
    // componentDidMount () {
    //     document.querySelector('.property-menu a:nth-child(2)').classList.add("disabled")
    // }

    // componentDidUpdate() {
    //     if (this.props.nodeProperty == null) {
    //         document.querySelector('.property-menu a:nth-child(2)').classList.add("disabled")
    //     } else {
    //         document.querySelector('.property-menu a:nth-child(2)').classList.remove("disabled")
    //     }
    // }
    getSettingPane = () => {
        if (this.props.nodeProperty == null) {
            return ( 
                <Tab.Pane></Tab.Pane>
            )
        }

        return (
            <Tab.Pane>
                <Formik
                    enableReinitialize={true}
                    initialValues={this.props.nodeProperties}
                    onSubmit={(values) => {
                        // console.log(this.props.nodeClass, values, e)
                        this.props.modifyNodeProperty(this.props.nodeProperty, values)
                    }}
                >
                    {({ values, handleChange, handleSubmit }) => {

                        return (
                            <Form style={{ width: "min-content" }} onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor="prop1" style={{ display: "block" }}> Prop1 </label>
                                    <input
                                        id="prop1"
                                        type="text"
                                        value={values.prop1}
                                        onChange={handleChange}
                                        className="text-input"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        id="prop2"
                                        type="text"
                                        value={values.prop2}
                                        onChange={handleChange}
                                        className="text-input"
                                    />
                                </Form.Field>

                                <Button type="submit">
                                    Submit
                                    </Button>
                            </Form>
                        )

                    }}
                </Formik>
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
                <div style={{display:"flex"}}>
                    {/* <Tab className="property-menu" menu={{ pointing: true, className: "node-prop tab-lbl" }} panes={this.getTabPanes()} /> */}
                    < PropertyAccord />
                    < PropertyDescrip />
                </div>
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