import React from 'react';
import {connect} from 'react-redux';
import {templateFunctionBreakdownSelect} from '../../../actions';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { HashLink as Link } from 'react-router-hash-link';


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
        if (this.props.templateCodeInfo !=  null) {

            let split_code;
            let func_name;
            split_code = Object.keys(this.props.templateCodeInfo).map((func_name) => {
                if ((func_name != 'template_code') && (func_name != 'overall_descrip')) {

                    return (
                        <Link to={"#"+func_name}>
                            <p
                            id={func_name}
                            key={func_name}
                            onClick={this.onFuncClick}
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                            className={this.state.functionInfoSelected == func_name ? 'active' : ''}>
                                {func_name}
                            </p>
                        </Link>
                    )
                }
            })
            
            split_code.splice(0, 0,
                <Link to="#overall_descrip">
                    <p 
                        id="overall_descrip"
                        key="overall_descrip"
                        onClick={this.onFuncClick}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        className={this.state.functionInfoSelected == 'overall_descrip' ? 'active' : ''}>
                            Template Code Overview
                    </p>
                </Link>
)
                
            return split_code
        }

    }

    render () {
        return (      
                <div className="function-break-down">
                    {this.getFunctionBreakdown()}
                </div>

        )
    }
}

const mapStateToProps = (state) => {
    return ({
        templateCodeInfo: state.templateCodeInfo.template_func_description,
        funcInfoSelect: state.funcInfoSelected
    })
}

export default compose (connect(mapStateToProps, {templateFunctionBreakdownSelect}),
                        withRouter) (functionBreakdownSection)