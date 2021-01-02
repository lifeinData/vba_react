import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { modifyNodeProperty } from '../../actions/index'
import { Button, Checkbox, Form, Tab } from 'semantic-ui-react'

class nodePropertyBox extends React.Component {
    getNodePropertySetting = () => {
        // console.log('node property box loaded')
        // console.log(this.props.nodeProperties[nodeClass])
        // console.log('these are the intiial values', this.props.nodeProperties[nodeClass])
        return this.props.nodeProperties
    }

    getTabPanes = () => {
        const panes = [
            {
                menuItem: "About",

                render: () => <Tab.Pane>About this function</Tab.Pane>
            },
            {
                menuItem: 'Settings',
                render: () =>
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
            },
        ]

        return panes


    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {/* <h1 style={{ width: "inherit", marginBottom: "50px" }}>Properties for {this.props.nodeProperty}</h1> */}
                    <Tab menu={{pointing: true,  className: "node-prop tab-lbl"}} panes={this.getTabPanes()} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state, ownProps)
    // return { test: 'test' }

    return { nodeProperties: state.mainFlowNodes[ownProps.nodeProperty] }
}

export default connect(mapStateToProps, { modifyNodeProperty })(nodePropertyBox)