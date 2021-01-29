import { Formik, Field } from 'formik';
import { Accordion, Icon, Button, Checkbox, Form, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { modifyNodeProperty } from '../../actions'
import React from 'react';
import ColumnDropDown from './data_column_components/columnDropDownList'

class settingFields extends React.Component {
    
    render() {
        console.log(this.props.nodeProperties)
        return (
            <React.Fragment>
                <Formik
                    enableReinitialize={true}
                    initialValues={this.props.nodeProperties}
                    onSubmit={(values) => {
                        console.log('these are the values', values)
                        this.props.modifyNodeProperty(this.props.nodeProperty, values)
                    }}
                >
                    {({ values, handleChange, handleSubmit }) => {

                        return (
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <input
                                        id="columns"
                                        type="text"
                                        value={values.columns}
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
                <ColumnDropDown />
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log(state, ownProps)
    // return { test: 'test' }
    console.log('this is hte node property', ownProps)
    if (ownProps.nodeProperty == null) {
        return { nodeProperties: null }
    } else {
        return { nodeProperties: state.mainFlowNodes[ownProps.nodeProperty] }
    }

}

export default connect(mapStateToProps, { modifyNodeProperty })(settingFields);