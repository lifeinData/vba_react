import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap'

const VaultTemplateDisplay = (props) => {
    
    console.log(props)

    const displayCode = () => {
        if (props.match.params.id == null){
            return (
                <Alert variant="dark">
                    Click on a template to the left to see its code and function breakdown 
                </Alert>
            )
        } else if (props.match.params.id){
            return (
                <Alert variant="dark">
                    This happens when the template is clicked
                </Alert>
            ) 
        }
    }

    return (
        <React.Fragment>
        <div className="macro-generator-container">
            {displayCode()}
        </div>
        </React.Fragment>
    )
}

export default VaultTemplateDisplay;