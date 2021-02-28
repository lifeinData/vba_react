import React from 'react';
import cpIcon from '../../../images/copy_paste_icon.png';
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux';

class codeOptions extends React.Component {
    constructor(props){
        super (props)
        this.state = {
            'code-cp-tooltip-class' : "code-tooltip hide",
            'code-function-tooltip-class' : "code-tooltip hide",
        }
    }

    handleMouseHover = (tooltip) => {
        this.setState({
            [tooltip] : "code-tooltip show"
        })
    }

    handleMouseLeave = (tooltip) => {
        this.setState({
            [tooltip] : "code-tooltip hide"
        })
    }

    copyToClipBoard = (mode) => {
        if (mode == 'full') {
            navigator.clipboard.writeText(this.props.templateToDisplay)
        }
    }

    render () {
        return (
            <React.Fragment>
                <p topic="dq" className="menu-header-h1">TEMPLATE CODE OPTIONS</p>
                <div class="code-option-box">
                    <div class="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-cp-tooltip-class')}}
                             onMouseLeave={() => {this.handleMouseLeave('code-cp-tooltip-class')}}
                             className="cp_all_code" src={cpIcon}
                             onClick={() => {this.copyToClipBoard('full')}}
                             />
                        <div className={this.state['code-cp-tooltip-class']}>
                            Copy all code
                        </div>
                    </div>
                    <div class="option-select">
                        
                    </div>
                    <div class="option-select">
                    
                    </div>
                    <div class="option-select">
                    
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        templateToDisplay: state.templateCodeInfo.template_code,
    })
}

export default connect(mapStateToProps)(codeOptions);