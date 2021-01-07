import React from 'react';
import { connect } from 'react-redux';

class propertyDescrip extends React.Component {
    constructor (props) {
        super(props)
        
    }

    render () {
        return (
            <div>
                {this.props.nodePropertyDescriptionSelect}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        'nodePropertyDescriptionSelect' : state.nodePropertyDescrip
    }
}

export default connect( mapStateToProps, {} )(propertyDescrip)