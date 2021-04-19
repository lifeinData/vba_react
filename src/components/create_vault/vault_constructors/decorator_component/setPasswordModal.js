import React from 'react';
import { connect } from 'react-router-dom'
import {Field, Formik, Form} from 'formik';
import { Button, Label} from 'semantic-ui-react';
import Switch from 'react-switch'
import ReactDOM from 'react-dom';

const SetPasswordModal = (props) => {

    const validateInitialPw = (value) => {
        let error;
        let pwRegex = new RegExp("\W", 'gm')
        if (value.match(/\W+/g)){
            error = "Must not contain any non-words"
        } else if (value === ''){
            error = "Must not be blank unless no password is enabled"
        }

        return error
    }

    const validateConfirmPw = (initialPw, value) => {
        console.log(initialPw, value)
        let error;
        if (initialPw !== value){
            error = "The passwords don't match! DUMBASS"
        } else if (value === '') {
            error = "Must not be blank unless no password is enabled. DUMBASS"
        }
        console.log('this is the error', error)
        return error
    }


    return (
    <React.Fragment>
        <Formik 
            initialValues = {{
                'initialPw':'',
                'confirmPw':''
            }}
            
            onSubmit = {(values)=>{
                console.log('formik set pw values', values)
            }}
        >
        
        {({values, errors, touched}) => (
        
            <Form className='set-pw-form'>
                <p className="set-pw-maintitle">Enter a password for deleting permissions</p>
                <div className="set-pw-inner-cont" style={{display:"flex"}}>
                    <p className="set-pw-subtitle">Don't set any password</p>
                    <Switch
                            // checked={props.viewerMode}
                            // onChange={() => {props.vaultViewSwitch(props.viewerMode == true ? false : true )}}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch adding-priv-toggle"
                            id="material-switch"
                    />
                    <Button basic className="adding-priv-info" color='green'>
                        ?
                    </Button>
                </div>
                <div className="set-pw-inner-cont" style={{display:"flex"}}>
                    <p className="set-pw-subtitle">Enable for Adding templates</p>
                    <Switch
                            // checked={props.viewerMode}
                            // onChange={() => {props.vaultViewSwitch(props.viewerMode == true ? false : true )}}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch adding-priv-toggle"
                            id="material-switch"
                    />
                    <Button basic className="adding-priv-info" color='green'>
                        ?
                    </Button>
                </div>
                <div className="set-pw-input">
                    <Field type="password"
                        validate={validateInitialPw} 
                        id="initialPw" 
                        name="initialPw"
                        value={values.initialPw}></Field>
                    {errors.initialPw && touched.initialPw && <Label className="set-pw-error" basic color='red' pointing>{errors.initialPw}</Label>}
                    
                    <Field type="password"
                        validate={(value) => validateConfirmPw(values.initialPw, value)}
                        id="confirmPw" 
                        name="confirmPw"
                        value={values.confirmPw}></Field>

                    {errors.confirmPw && touched.confirmPw && <Label className="set-pw-error" basic color='red' pointing>{errors.confirmPw}</Label>}
                    <Button type="submit" basic color='blue'> Submit Password </Button>
                </div>
            
            </Form>
        )}
    </Formik>
    </React.Fragment>
    )
}

export default SetPasswordModal;