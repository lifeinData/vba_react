import { Formik, Field } from 'formik';
import { Accordion, Icon, Button, Checkbox, Form, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { modifyNodeProperty, columnDropDownSubmit } from '../../actions'
import React from 'react';
import ColumnDropDown from './data_column_components/columnDropDownList'

class settingFields extends React.Component {
    parseColumnPaste (inputVal) {
        let tmp_obj = {}
        let columnAry = inputVal.split('\t')
        let col;
        for (col of columnAry) {
            tmp_obj[col] = 'na'
        }

        return tmp_obj
    }

    render() {
        console.log(this.props.nodeProperties)
        return (
            <React.Fragment>
                <Formik
                    enableReinitialize={true}
                    initialValues={this.props.nodeProperties}
                    onSubmit={(values) => {
                        this.props.modifyNodeProperty(this.props.nodeProperty, values)
                        this.props.columnDropDownSubmit(this.parseColumnPaste(values.columns))
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

export default connect(mapStateToProps, { modifyNodeProperty, columnDropDownSubmit })(settingFields);