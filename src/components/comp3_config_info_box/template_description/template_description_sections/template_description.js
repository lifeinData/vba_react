
import React from 'react';
import { connect } from 'react-redux'

class templateDescription extends React.Component {
    constructor(props){
        super(props)

    }

    displayHeading = () => {
        if (this.props.selectedFuncInfo == 'overall_descrip'){
            return "ABOUT THIS TEMPLATE"
        } else {
            return "ABOUT THIS FUNCTION"
        }
    }

    renderTemplateDescrip = () => {
        if (this.props.funcDescrip != null) {
            return (
                <React.Fragment>
                    <p className="descrip-header">{this.props.selectedFuncInfo}</p>
                    <p className="descrip-txt">
                        {this.props.funcDescrip[this.props.selectedFuncInfo]}
                    </p>
                </React.Fragment>
            )
        }
    }

    render () {
        if (this.props.funcDescrip != null) {
            return (
                <React.Fragment>
                    <p topic="dq" className="menu-header-h1">{this.displayHeading()}</p>
                    {this.renderTemplateDescrip()}
                </React.Fragment>
            )
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return ({
        funcDescrip : state.templateCodeInfo,
        selectedFuncInfo: state.funcInfoSelected
    })
}

export default connect(mapStateToProps, {})(templateDescription)