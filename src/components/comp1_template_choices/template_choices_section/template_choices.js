import React from 'react';
import {connect} from 'react-redux';
import {Accordion, Icon} from 'semantic-ui-react';
import { parseTemplateOptions, parseTemplateRequest, templateOptionClicked, templateCodeChoice } from '../../../actions/index';
import { Resizable } from "re-resizable";
import { Link } from 'react-router-dom';

class templateChoices extends React.Component {
    constructor(props){
        super(props)
        this.props.parseTemplateOptions()
        this.state = {
            'accordActiveIndex': []
        }
        this.choiceID=''
    }

    componentDidUpdate (prevProps) {
        if (prevProps.templateChoices != this.props.templateChoices) {
            this.setState({
                'accordActiveIndex': [...Array(Object.keys(this.props.templateChoices).length).keys()]
            })
        }
    }

    templateChoiceOnClick = (e) => {
        let [header, template_id] = e.target.id.split('-')
        // [this.header, this.template_id] = e.target.id.split('-')
        // this.props.parseTemplateRequest(header, template_id)
        // console.log(window.location.href)
        this.props.templateCodeChoice(header, template_id)
        if (!(this.props.templateChoiceClicked)){
            this.props.templateOptionClicked()
        }
    }

    transformToSubheading = (key) => {
        let subheading = []
        for (let choice of Object.keys(this.props.templateChoices[key])){
            if (choice != "id") {
                // this.choiceID = this.props.templateChoices[key][choice]['id']
                subheading.push(

                    <p key={this.props.templateChoices[key][choice]['id']} 
                    
                    onClick={this.templateChoiceOnClick}>
                        <Link to = { "/home/" + this.props.templateChoices[key]['id'] + "/" + this.props.templateChoices[key][choice]['id']}
                        id={this.props.templateChoices[key]['id'] + '-' + this.props.templateChoices[key][choice]['id']}> 
                            {choice} 
                        </Link>
                        
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
                            {category.toUpperCase()}
                        </Accordion.Title>
                        <Accordion.Content key={category} active={this.state.accordActiveIndex.includes(index)}>
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
            <Resizable   
                defaultSize={{
                    width:330,
                    height:"100vh",
                }}
                className="templateChoiceMenu"
                minWidth="330px"
                maxWidth="677px"
                minHeight="100vh"
                enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            >
                <Accordion
                    exclusive={false}
                    className="menu-choice-header-h1"
                >
                    {this.transformToMenu()}
                </Accordion>

            </Resizable>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return (
        {
            templateChoices: state.templateChoice.data,
            templateChoiceClicked: state.templateChoice.templateChoiceClicked
        }
    )
    
}

export default connect (mapStateToProps, {templateCodeChoice, parseTemplateOptions, parseTemplateRequest, templateOptionClicked})(templateChoices)
