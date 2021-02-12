import React from 'react';
import {connect} from 'react-redux';
import {templateFunctionBreakdownSelect} from '../../../actions';

class functionBreakdownSection extends React.Component {
    constructor(props) {
        super(props)
    }

    funcBreakdownClick = (func_n) => {
        this.props.templateFunctionBreakdownSelect(func_n)
    }

    onMouseEnter = () => {
        
    }

    getFunctionBreakdown = () => {
        if (this.props.templateToDisplay !=  null) {
            let split_code = this.props.templateToDisplay.split('End Function')
            let captureRegex = /Function (\w+)/
            
            // let func_name = []
            // /* Extract the function name */
    
            // for (let func_n of split_code) {
            //     let capture = func_n.match(captureRegex)
            //     if (capture != null) {
            //         func_name.push(capture[1])
            //     }
                
            // }
            // let func_name = [1,2,3,4,5]
    
            return split_code.map((el) => {
                if (el.match(captureRegex) != null) {
                    return (
                        <p key={el} 
                        onClick={() => this.funcBreakdownClick(el)}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}>
                            {el.match(captureRegex)[1]}
                        </p>
                    )
                }
            })
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
        templateToDisplay: state.templateCodeInfo.template_code
    })
}

export default connect(mapStateToProps, {templateFunctionBreakdownSelect})(functionBreakdownSection)