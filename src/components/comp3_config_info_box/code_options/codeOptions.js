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
        if (mode == 'code-cp-tooltip-class') {
            navigator.clipboard.writeText(this.props.templateToDisplay)
            this.setState({[mode]: "code-tooltip clicked"})
        } else if (mode == 'code-function-tooltip-class') {
            navigator.clipboard.writeText(this.props.funcBlockToCopy)
            this.setState({[mode]: "code-tooltip clicked"})
        } else if (mode == 'code-link-tooltip-class'){
            let link = window.location.href
            if (link.includes("#")){
                link = link.split("#")[0]
            }

            navigator.clipboard.writeText(link)
            this.setState({[mode]: "code-tooltip clicked"})
        }
    }

    optnStringRender = (optnClass) => {
        if (this.state[optnClass].includes('clicked')){
            return "Copied!"
        } else if (optnClass == 'code-cp-tooltip-class') {
            return "Copy all code"
        } else if (optnClass == 'code-function-tooltip-class') {
            return "Copy code section"
        } else if (optnClass == 'code-link-tooltip-class') {
            return "Copy code link"
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
                             src={cpIcon}
                             onClick={(e) => {this.copyToClipBoard('code-cp-tooltip-class')}}
                        />
                        <div className={this.state['code-cp-tooltip-class']}>
                            {this.optnStringRender('code-cp-tooltip-class')}
                        </div>
                    </div>
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-function-tooltip-class')}}
                             onMouseLeave={() => {this.handleMouseLeave('code-function-tooltip-class')}}
                             src={cpSectionIcon}
                             onClick={() => {this.copyToClipBoard('code-function-tooltip-class')}}
                        />
                        <div className={this.state['code-function-tooltip-class']}>
                            {this.optnStringRender('code-function-tooltip-class')}
                        </div>
                    </div>
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-link-tooltip-class')}}
                             onMouseLeave={() => {this.handleMouseLeave('code-link-tooltip-class')}}
                             onClick={() => {this.copyToClipBoard('code-link-tooltip-class')}}
                             src={cpLinkIcon}
                        />
                        <div className={this.state['code-link-tooltip-class']}>
                            {this.optnStringRender('code-link-tooltip-class')}
                        </div>
                    
                    </div>
                    <div className="option-select">
                        <img onMouseEnter={() => {this.handleMouseHover('code-link-tooltip-class')}}
                                onMouseLeave={() => {this.handleMouseLeave('code-link-tooltip-class')}}
                                className="cp_all_code" src={likeIcon}
                        />

                        <div className={this.state['code-link-tooltip-class']}>
                            This is cool!
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