import React from 'react';
import { Dropdown, Menu, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux'

class columnDropDownList extends React.Component {
    constructor(props) {
        super(props)
        
    }

    getColumnChoices = () => {
        let testAry = ['a','b','c']
        let columnDropDown = testAry.map((e) => {
            return (
                <Dropdown.Item key={e} children={
                    <div style={{display:'flex'}}>
                        e
                        <Radio
                            label='Text'
                            checked={true}
                        />
                        <Radio
                            label='Text'
                            checked={true}
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
                <Dropdown text="Column Drop Down Choices" open={false}>
                    <Dropdown.Menu>
                        {this.getColumnChoices()}
                    </Dropdown.Menu>
                    
                </Dropdown>
                    
            </React.Fragment>
        )
    }

}

// const mapStateToProps = (state) => {
//     return ({
//         'dataColumns' :
//     })
// }

export default columnDropDownList