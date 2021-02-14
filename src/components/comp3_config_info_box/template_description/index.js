import React from 'react';
import { connect } from 'react-redux'
import TemplateDescription from './template_description_sections/template_description'

class templateDescriptionSection extends React.Component {
    render () {
        return (
            <React.Fragment>
                <TemplateDescription />
            </React.Fragment>
        )
    }
}

export default templateDescriptionSection