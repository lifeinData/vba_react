import React from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { modifyNodeProperty } from '../../actions/index'

class nodePropertyBox extends React.Component {
    getNodePropertySetting = () => {
        console.log('node property box loaded')
        const nodeClass = this.props.nodeClass
        // console.log(this.props.nodeProperties[nodeClass])
        console.log('these are the intiial values', this.props.nodeProperties[nodeClass])
        return this.props.nodeProperties[nodeClass]
    }

    render() {
        return (
            <React.Fragment>
                <h1 style={{ marginBottom: "50px" }}>This is fffa form</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={this.getNodePropertySetting()}
                    onSubmit={(values) => {
                        // console.log(this.props.nodeClass, values, e)
                        this.props.modifyNodeProperty(this.props.nodeClass, values)
                        }}
                >
                    {({values, handleChange, handleSubmit }) => {
                        
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="prop1" style={{ display: "block" }}> Prop1 </label>
                                <input
                                    id="prop1"
                                    type="text"
                                    value={values.prop1}
                                    onChange={handleChange}
                                    className="text-input"
                                />
                                <input
                                    id="prop2"
                                    type="text"
                                    value={values.prop2}
                                    onChange={handleChange}
                                    className="text-input"
                                />
                                <button type="submit">
                                    Submit
                                </button>
                            </form>
                        )

                    }}
                </Formik>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state, ownProps)
    // return { test: 'test' }

    return { nodeProperties: state.nodeProperty }
}

export default connect(mapStateToProps, { modifyNodeProperty })(nodePropertyBox)