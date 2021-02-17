import React from 'react';
import {connect} from 'react-redux';
import {Accordion, Icon} from 'semantic-ui-react';
import { parseTemplateOptions } from '../../../actions/index';

class templateChoices extends React.Component {
    constructor(props){
        super(props)
        this.props.parseTemplateOptions()
        this.state = {
            'accordActiveIndex': []
            // 'accordActiveIndex': []
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.templateChoices != this.props.templateChoices) {
            this.setState({
                'accordActiveIndex': [...Array(Object.keys(this.props.templateChoices).length).keys()]
                // 'accordActiveIndex': []
            }, ()=>{console.log(this.state.accordActiveIndex)})
        }
    }

    transformToSubheading = (key) => {
        let subheading = []
        for (let choice of Object.keys(this.props.templateChoices[key])){
            if (choice != "id") {
                subheading.push(
                    <p>
                        {choice}
                    </p>
                )
            } 
        }

        return subheading
    }

    transformToMenu = () => {
        
        let templateChoiceCate = []
        let index = 0
        
        for (let category of Object.keys(this.props.templateChoices)){
            if (category != 'id'){
                templateChoiceCate.push(
                    <React.Fragment>
                        <Accordion.Title
                            active = {this.state.accordActiveIndex.includes(index)}
                            index = {index}
                            onClick = {this.handleAccordOnClick}
                            className = "menu-header-h1 menu-choice"
                        >
                        <Icon name='dropdown' />
                            {category}
                        </Accordion.Title>
                        <Accordion.Content className="test-content" active={this.state.accordActiveIndex.includes(index)}>
                            {this.transformToSubheading(category)}
                        </Accordion.Content>
                    </React.Fragment>
                
                )
                index += 1
            }
        }

        return templateChoiceCate
    }

    handleAccordOnClick = (e, titleProps) => {
        const index = titleProps.index
        const activeIndexAry = this.state.accordActiveIndex

        if (activeIndexAry.includes(index)) {
            activeIndexAry.splice(activeIndexAry.indexOf(index), 1)
            this.setState({ accordActiveIndex: activeIndexAry })
        } else {
            this.setState({ accordActiveIndex: activeIndexAry.concat(index) })
        }
    }

    render () {
        
        return (
            <React.Fragment>
                <Accordion
                    exclusive={false}
                    className="menu-choice-header-h1"
                >
                    {this.transformToMenu()}
                </Accordion>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return (
        {templateChoices: state.templateChoice}
    )
    
}

export default connect (mapStateToProps, {parseTemplateOptions})(templateChoices)
