import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Dropdown, Menu, Radio } from 'semantic-ui-react';
import { columnTypeChanged } from '../../../actions'

class currentColumnList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {colTypeMap: {
            'na': 'Do not use',
            'num': 'Numeric',
            'txt': 'Text'
        }}
    }

    newTypePicked = (e, data) => {
        let tmp_type = {}
        tmp_type[data.target_col] = data.value
        this.props.columnTypeChanged(tmp_type)
    }
    
    getColumnChoices = () => {
        let cols = _.keys(this.props.columnChoices)
        let columnDropDown = cols.map((e) => {
            return (
                    <div className="column_choices_list">
                        <p>{e}</p>
                        <div className='drop-down-cont'>
                            <Dropdown
                                options = {[{
                                    key: {e} + 'na',
                                    text:"Do not use",
                                    value:'na',
                                    active:this.props.columnChoices[e] == 'na'
                                },
                                {
                                    key: {e} + 'num',
                                    text:"Numeric",
                                    value:'num',
                                    active:this.props.columnChoices[e] == 'num',
                                    
                                },
                                {
                                    key: {e} + 'txt',
                                    text:"Text",
                                    value:'txt',
                                    active:this.props.columnChoices[e] == 'txt'
                                }]}

                                text = {this.state.colTypeMap[this.props.columnChoices[e]]}
                                target_col = {e}
                                onChange = {this.newTypePicked}
                            >
                            </Dropdown>
                        </div>

                    </div> 
            )
        })

        return columnDropDown
    }

    render () {
        return (
            this.getColumnChoices()
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        'columnChoices': state.columnChoices
    })
}

export default connect(mapStateToProps, { columnTypeChanged } )(currentColumnList)