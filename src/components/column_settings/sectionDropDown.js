import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import InsertNewColumn from './column_settings_sections/insertNewColumn'

class sectionDropDown extends React.Component {
    constructor(props){
        super(props)
        this.state = { activeIndex: [0, 1]}
    }

    handleTitleClick = (e, titleProps) => {
        const index = titleProps.index
        const activeIndexAry = this.state.activeIndex

        if (activeIndexAry.includes(index)) {
            activeIndexAry.splice(activeIndexAry.indexOf(index), 1)
            this.setState({ activeIndex: activeIndexAry })
        } else {
            this.setState({ activeIndex: activeIndexAry.concat(index) })
        }

    }
    
    render () {
        return (
        <React.Fragment>
            <p topic="dq" className="menu-header-h1">COLUMN SETTINGS</p>
            <Accordion
                exclusive={false}
                fluid
                className=""
            >
                <div id="addColumn">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(0)}
                        index={0}
                        className="menu-header-h2 noselect"
                    >
                    
                        <Icon name='dropdown' />
                        INSERT NEW COLUMNS
                    </Accordion.Title>
                    <Accordion.Content className="test-content" active={this.state.activeIndex.includes(0)}>
                        <InsertNewColumn />
                    </Accordion.Content>
                </div>

                <div id="explanation">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(1)}
                        index={1}
                        className="menu-header-h2 noselect"
                    >
                    
                        <Icon name='dropdown' />
                        EXPLANATION
                    </Accordion.Title>
                    <Accordion.Content className="test-content" active={this.state.activeIndex.includes(1)}>
                        {/* <SettingsFields nodeProperty={this.props.nodeProperty}/> */}
                    </Accordion.Content>
                </div>


                <div id="column-list">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(2)}
                        index={2}
                        className="menu-header-h2 noselect"
                    >
                    
                        <Icon name='dropdown' />
                        CURRENT COLUMN LIST
                    </Accordion.Title>
                    <Accordion.Content className="test-content" active={this.state.activeIndex.includes(2)}>
                        {/* <SettingsFields nodeProperty={this.props.nodeProperty}/> */}
                    </Accordion.Content>
                </div>

            </Accordion>
            {/* <p topic="dq" className="menu-header-h2">INSERT NEW COLUMNS</p>
            <p topic="dq" className="menu-header-h2">EXPLANATION</p>
            <p topic="dq" className="menu-header-h2">COLUMN LIST</p> */}
        </React.Fragment>
        )
    }   
}

export default sectionDropDown;