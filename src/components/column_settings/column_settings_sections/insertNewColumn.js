import React from 'react';
import { connect } from 'react-redux';
import { columnDropDownSubmit } from '../../../actions'
import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';

class insertNewColumn extends React.Component {
    constructor (props) {
        super(props)

    }

    parseColumnPaste (inputVal) {
        let tmp_obj = {}
        let columnAry = inputVal.split('\t')
        let col;
        for (col of columnAry) {
            tmp_obj[col] = 'na'
        }

        return tmp_obj
    }

    render () {
        return (
            <Formik
                    enableReinitialize={true}
                    initialValues={{columns:''}}
                    onSubmit={(values) => {
                        this.props.columnDropDownSubmit(this.parseColumnPaste(values.columns))
                    }}
            >
                {({ values, handleChange, handleSubmit }) => {

                    return (
                        <Form onSubmit={handleSubmit} className="column-input-form">
                            <Form.Field className="column-input">
                                <input
                                    id="columns"
                                    type="text"
                                    value={values.columns}
                                    onChange={handleChange}
                                />
                            </Form.Field>

                            <Button type="submit">
                                Add Columns
                            </Button>
                        </Form>
                    )

                }}
            </Formik>
        )
    
    }
}


export default connect(null, {columnDropDownSubmit})(insertNewColumn);