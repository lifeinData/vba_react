import React from 'react';
import {connect} from 'react-redux';
import {templateFunctionBreakdownSelect} from '../../../actions';

class functionBreakdownSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'functionInfoSelected':'overall_descrip'}
    }

    funcBreakdownClick = (func_n) => {
        this.props.templateFunctionBreakdownSelect(func_n)
    }

    onMouseEnter = (e, d) => {
        // this.props.templateFunctionBreakdownSelect({'funcSelected' : e.target.id})
        // this.setState({'functionInfoSelected': e.target.id})
        // this.props.templateFunctionBreakdownSelect(e.target.id)
        console.log('hello')
    }

    onFuncClick = (e) => {
        this.setState({'functionInfoSelected':e.target.id})
        this.props.templateFunctionBreakdownSelect(e.target.id)
    }

    onMouseLeave = () => {
        // this.props.templateFunctionBreakdownSelect(this.state.functionInfoSelected)
        console.log('hello')
    }

    getFunctionBreakdown = () => {
        if (this.props.templateToDisplay !=  null) {

            let split_code;
            let func_name;
            split_code = Object.keys(this.props.templateToDisplay).map((func_name) => {
                if ((func_name != 'template_code') && (func_name != 'overall_descrip')) {

                    return (
                        <p 
                        id={func_name}
                        key={func_name}
                        onClick={this.onFuncClick}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        className={this.state.functionInfoSelected == func_name ? 'active' : ''}>
                            {func_name}
                        </p>
                    )
                }
            })
            
            split_code.splice(0, 0,
                <p 
                    id="overall_descrip"
                    key="overall_descrip"
                    onClick={this.onFuncClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    className={this.state.functionInfoSelected == 'overall_descrip' ? 'active' : ''}>
                        Template Code Overview
                </p>)
                
            return split_code
        }

    }

    render () {
        return (
            <React.Fragment>
                <div className="function-break-down">
                    {this.getFunctionBreakdown()}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        templateToDisplay: state.templateCodeInfo,
        funcInfoSelect: state.funcInfoSelected
    })
}

export default connect(mapStateToProps, {templateFunctionBreakdownSelect})(functionBreakdownSection)