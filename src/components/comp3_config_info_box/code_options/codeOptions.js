import React from 'react';
import cpIcon from '../../../images/copy_paste_icon.png';
import cpSectionIcon from '../../../images/copy_paste_section.png';
import cpLinkIcon from '../../../images/copy_link.png'
import likeIcon from '../../../images/like_icon.png'
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

class codeOptions extends React.Component {
    constructor(props){
        super (props)
        this.state = {
            'code-cp-tooltip-class' : "code-tooltip hide",
            'code-function-tooltip-class' : "code-tooltip hide",
            'code-link-tooltip-class': "code-tooltip hide"
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
        } else if (mode == 'functionBlock') {
            navigator.clipboard.writeText(this.props.funcBlockToCopy)
        }
    }

    render () {
        return (
            <React.Fragment>
                <p topic="dq" className="menu-header-h1">TEMPLATE CODE OPTIONS</p>
                <div className="code-option-box">
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-cp-tooltip-class')}}
                             onMouseLeave={() => {this.handleMouseLeave('code-cp-tooltip-class')}}
                             className="cp_all_code" src={cpIcon}
                             onClick={() => {this.copyToClipBoard('full')}}
                             />
                        <div className={this.state['code-cp-tooltip-class']}>
                            Copy all code
                        </div>
                    </div>
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-function-tooltip-class')}}
                             onMouseLeave={() => {this.handleMouseLeave('code-function-tooltip-class')}}
                             className="cp_all_code" src={cpSectionIcon}
                             onClick={() => {this.copyToClipBoard('functionBlock')}}
                        />
                        <div className={this.state['code-function-tooltip-class']}>
                            Copy code section
                        </div>
                    </div>
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-link-tooltip-class')}}
                             onMouseLeave={() => {this.handleMouseLeave('code-link-tooltip-class')}}
                             className="cp_all_code" src={cpLinkIcon}
                        />
                        <div className={this.state['code-link-tooltip-class']}>
                            Copy code link
                        </div>
                    
                    </div>
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-link-tooltip-class')}}
                                onMouseLeave={() => {this.handleMouseLeave('code-link-tooltip-class')}}
                                className="cp_all_code" src={likeIcon}
                        />

                        <div className={this.state['code-link-tooltip-class']}>
                            Copy code link
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        templateToDisplay: state.templateCodeInfo.template_code,
        funcBlockToCopy: state.funcInfoSelected.funcBlock
    })
}

export default connect(mapStateToProps)(codeOptions);