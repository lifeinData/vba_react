import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Resizable } from "re-resizable";
import { propTypes } from 'react-bootstrap/esm/Image';

const InformationBoxContainer = (props) => {

    useEffect( () => {

    }, [props.functionSelected])

    const renderTemplateDescrip = () => {
        let descrip_txt; 
        if (props.functionSelected != '') {
            if (props.functionSelected != 'overall_descrip') {
                descrip_txt = props.templateTagData['func_descrip'][props.functionSelected]
            } else {
                //todo: change this later to be consistent
                descrip_txt = props.templateTagData['overall_descrip']
            }

            return (
                <React.Fragment>
                    <p className="descrip-header">{props.functionSelected}</p>
                    <p className="descrip-txt">
                        {descrip_txt}
                    </p>
                </React.Fragment>
            )
            
        }

        return null;
    }

    return (
        <Resizable   
            defaultSize={{
                width:377,
                height:"calc(100vh - 44px)",
            }}
            className="informationBox"
            minWidth="420px"
            maxWidth="677px"
            enable={{ top:false, right:false, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            >

                <div className="template-info-cont">
                    {renderTemplateDescrip()}
                </div>

                <div className="template-code-opt-cont">
                    {/* <CodeOptions /> */}
                </div>

                <div className="template-targetcol-cont">
                    {/* <ColumnSettingSection /> */}
                </div>
            </Resizable>
    )
}

const mapStateToProps = (state) => {
    return ({
        'functionSelected': state.appState['functionSelected'],
        'templateTagData': state.templateTags['data']
    })
}

export default connect(mapStateToProps, {})(InformationBoxContainer)