import React, { useEffect, useState } from 'react';
import { TextArea, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { setVaultID, vaultViewSwitch } from '../../actions';
import { Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import parseRequestAxio from '../../apis/parseRequest';
import VaultMenu from './vault_constructors/menuConstructor'
import TemplateDisplay from './vault_constructors/templateDisplayConstructor'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux';
import TemplateInputArea from './vault_constructors/templateInputArea';

const CustomVaultBuild = (props) => {
    // Todo: toggle here between adding to the vault and viewing the vault

    // const [vaultID, setVaultID] = useState('');
    // const [editMode, setEditMode] = useState(true);
    // const [viewVaultFlag, setViewVaultFlag] = useState(false)
    // const [vaultID, setVaultID] = useState('')
    let history = useHistory();
    let resetVaultFlag = false
    // let vaultID;

    function makeid(length) {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // const resetVault = () => {
    //     let tmp_vaultid;
    //     tmp_vaultid = makeid(8)
    //     history.push('/vaultID/' + tmp_vaultid)
    //     props.setVaultID(tmp_vaultid)
    // }

    useEffect(()=>{
        let vaultIDExtract = /(?<=\/vaultID\/)(.{8})(?=\/)|(?<=\/vaultID\/)(.{8})/
        let vaultIDCapture = window.location.href.match(vaultIDExtract)
    
        if (vaultIDCapture == null) {
            let uniqueID = makeid(8)
            history.push('/vaultID/' + uniqueID)
            props.setVaultID(uniqueID)
        } else {
            if (props.vaultID != vaultIDCapture[0]) {
                props.setVaultID(vaultIDCapture[0])
                props.vaultViewSwitch(false)
            }
        }
    })

    // const postNewVault = async (values) => {
    //     values['vaultID'] =  props.match.params.id
    //     let response = await parseRequestAxio.post('/postNewVaultTemplate/', values)
    //     // console.log (response)
    // }

    // const formik = useFormik({
    //     initialValues: {
    //         vbaInput: '',
    //         templateNameInput: '',
    //         templateCateInput: ''
    //     },

    //     onSubmit: values => {
    //         values.templateCateInput = values.templateCateInput == '' ? "All Category" : values.templateCateInput
    //         postNewVault(values)
    //     },

    //     enableReinitialize : true
    // });

    const templateDisplay = () => {
        if (!(props.viewerMode)) {
            return (
                <Route path="/vaultID/:id/:id?/" render={(props)=>(
                    <TemplateDisplay {...props} hasTemplateInfo={true} />
                )} />
            )
        } else if (props.viewerMode) {
            return <TemplateInputArea />
        }
    }
    return (
        <React.Fragment>
            <div id="main-app-layout">
                <VaultMenu vaultID={props.vaultID} />
                {templateDisplay()}
            </div>
{/*             
            <div className="vba-input-cont">
                <form onSubmit={formik.handleSubmit} className='vba-codeinput'>
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
                    <TextArea  id="vbaInput" name="vbaInput" className='vba-code-textarea' placeholder='VBA Code Here' onChange={formik.handleChange} value={formik.values.vbaCode}/>
                </form>
                
            </div> */}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        vaultID : state.appState['vaultid'],
        viewerMode : state.appState['viewerMode']
    }
}
export default connect(mapStateToProps, { setVaultID, vaultViewSwitch })(CustomVaultBuild);