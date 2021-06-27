import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Label} from 'semantic-ui-react';
import parseRequestAxio from '../../../../apis/parseRequest';
import { connect } from 'react-redux';


const EditorPwModalForm = (props) => {
    
    const validateEditorPw = (value) => {
        console.log('this validate runs here')
        let validPw;
        let error;
        parseRequestAxio.get('/validateEditPw/', {'vaultId': props.vaultID, 'editorPw': value}).then((response) => {
            validPw = response;
        })

        error = "test error"
        return error
    }

    return (
        <React.Fragment>
            <Formik 
                initialValues = {{
                    'initialPw':''
                }}
                
                onSubmit = {(values)=>{
                    console.log('formik set pw values', values)
                }}
            >
            
            {({values, validate, errors, touched}) => (
            
                <Form className='set-pw-form'>
                    <p className="set-pw-maintitle">Enter the password for editing permissions</p>
                    <Field type="password" 
                            id="initialPw"
                            name="initialPw"
                            validate={validateEditorPw}
                            value={values.initialPw}>        
                    </Field>
                    {errors.initialPw && touched.initialPw && <div>{errors.initialPw}</div>}
                    <Button type="submit" basic color='blue'> Submit </Button>
                </Form>
            )}
        </Formik>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return (
        {'vaultID': state.appState['vaultid']}
    )
}

export default connect(mapStateToProps)(EditorPwModalForm)