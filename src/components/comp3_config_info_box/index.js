
import React from 'react';
import { Resizable } from "re-resizable";
import TemplateDescriptionSection from './template_description';
import ColumnSettingSection from './column_settings'
import CodeOptions from './code_options/codeOptions'

class configInfoBoxSections extends React.Component {
    render () {
        return (
            <Resizable   
            defaultSize={{
                width:377,
                height:"100vh",
            }}
            className="informationBox"
            minWidth="377px"
            maxWidth="677px"
            minHeight="100vh"
            enable={{ top:false, right:false, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            >

                <div className="template-info-cont">
                    <TemplateDescriptionSection />
                {/*ABOUT THIS TEMPLATE 
                USAGE INFORMATION
                ERROR CHECKS
                REPORT SAMPLE
                */}
                </div>



                <div className="template-code-opt-cont">
                    <CodeOptions />
                </div>

                <div className="template-targetcol-cont">
                    <ColumnSettingSection />
                </div>
            {/* </div> */}
            </Resizable>
        )
    }
}

export default configInfoBoxSections