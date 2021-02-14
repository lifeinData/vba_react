import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Dropdown, Checkbox, Menu, Radio } from 'semantic-ui-react';
import { columnTypeChanged, toggleInsertColumn } from '../../../../actions'
import hljs from 'highlight.js';
import hljsVba from 'highlight.js/lib/vba';

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
            if (e != 'insertColumnFlag') {
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
            }

        })

        return columnDropDown
    }

    toggleInsertColumn = (e, data) => {
        if (data.checked) {
            this.props.toggleInsertColumn({'insertColumnFlag':true})
        } else {
            this.props.toggleInsertColumn({'insertColumnFlag':false})
        }


    }

    render () {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        hljs.registerLanguage("vba", hljsVba);
        return (
            <React.Fragment>
                <Checkbox toggle 
                    label="Insert Columns to Template"
                    onChange={this.toggleInsertColumn}
                />
                {this.getColumnChoices()}
            </React.Fragment>
            
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        'columnChoices': state.columnChoices
    })
}

export default connect(mapStateToProps, { toggleInsertColumn, columnTypeChanged } )(currentColumnList)