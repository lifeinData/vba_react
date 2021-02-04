import React from 'react';
import { Dropdown, Menu, Radio } from 'semantic-ui-react';
import { columnDropDownSubmit } from '../../../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class columnDropDownList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'dropDownPersist': false}
        
    }

    dropDownOnClick = () => {
        this.setState({'dropDownPersist' : true})
    }

    onDropDownLeave = () => {
        this.setState({'dropDownPersist' : false})
    }

    onRadioClick = (e, d) => {
        console.log('event: ', e, 'data: ', d)
    }
    getColumnChoices = () => {
        let cols = _.keys(this.props.columnDropDownSelections)

        let columnDropDown = cols.map((e) => {
            return (
                <Dropdown.Item key={e} children={
                    <div id="column_dropdown_select">
                        <p>{e}</p>
                        <Radio
                            col_tar={e}
                            value='txt'
                            label='Text'
                            checked= {this.props.columnDropDownSelections[e] == 'txt'}
                            onChange= {this.onRadioClick}
                        />
                        <Radio
                            col_tar={e}
                            value='num'
                            label='Numeric'
                            checked={this.props.columnDropDownSelections[e] == 'num'}
                        />

                        <Radio
                            col_tar={e}
                            value='na'
                            label='Do not use'
                            checked={this.props.columnDropDownSelections[e] == 'na'}
                        />
                    </div> 
                } />
            )
        })

        return columnDropDown
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown text="Column Drop Down Choices" 
                onClick={this.dropDownOnClick} open={true} onMouseLeave={this.onDropDownLeave}>
                    <Dropdown.Menu>
                        {this.getColumnChoices()}
                    </Dropdown.Menu>
                    
                </Dropdown>
                    
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        columnDropDownSelections : state.columnDropDownReducer
    })
}

export default connect(mapStateToProps, { columnDropDownSubmit })(columnDropDownList);