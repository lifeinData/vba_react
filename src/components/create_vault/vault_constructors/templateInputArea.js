import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setVaultID, vaultTemplateSubmitted } from '../../../actions';
import { useFormik } from 'formik';
import parseRequestAxio from '../../../apis/parseRequest';
import { TextArea, Input } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';

const TemplateInputArea = (props) => {
    let history = useHistory()
    const resetVault = () => {
        let tmp_vaultid;
        tmp_vaultid = makeid(8)
        history.push('/vaultID/' + tmp_vaultid)
        props.setVaultID(tmp_vaultid)
    }

    const postNewVault = async (values) => {
        values['vaultID'] =  props.vaultID
        console.log(values)
        let response = await parseRequestAxio.post('/postNewVaultTemplate/', values)
        if (props.templateCodeFlag) {
            props.vaultTemplateSubmitted(false)
        } else {
            props.vaultTemplateSubmitted(true)
        }
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const formik = useFormik({
        initialValues: {
            vbaInput: '',
            templateNameInput: '',
            templateCateInput: ''
        },

        onSubmit: values => {
            values.templateCateInput = values.templateCateInput == '' ? "All Category" : values.templateCateInput
            postNewVault(values)
        },

        enableReinitialize : true
    });

    return (
             
            <div className="column2-area">
                <form onSubmit={formik.handleSubmit} className='vba-codeinput'>
                    <div className="input-options-cont">
                        <div>
                            <label className="vault-builder-lbl" htmlFor="templateCateInput">Template Category Name</label>
                            <Input id="templateCateInput" name="templateCateInput" className='templateCateInput' placeholder='Defaults to "All Category"' onChange={formik.handleChange} value={formik.values.templateCateInput} />
                        </div>
                        
                        <div>
                        <label className="vault-builder-lbl" htmlFor="templateNameInput">Template Name</label>
                            <Input id="templateNameInput" name="templateNameInput" className='templateNameInput' placeholder='Defaults to "All Category"' onChange={formik.handleChange} value={formik.values.templateNameInput} />
                        </div>
                        
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <label className="vault-builder-lbl" htmlFor="vbaInput">Input your vba code</label>
                            <Button type="submit" variant="outline-success">Add Code</Button>
                            <Button onClick={resetVault} variant="outline-success">Create New Vault</Button>
                        </div>
                    </div>
                    

                    <TextArea  id="vbaInput" name="vbaInput" className='vba-code-textarea' placeholder='VBA Code Here' onChange={formik.handleChange} value={formik.values.vbaCode}/>
                </form>
                
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        vaultID : state.appState['vaultid'],
        templateCodeFlag: state.appState['templateSubmittedFlag']
    }
}
export default connect(mapStateToProps, { setVaultID , vaultTemplateSubmitted }) (TemplateInputArea);