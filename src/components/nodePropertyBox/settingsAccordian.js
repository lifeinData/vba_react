import { Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import React from 'react';
import { mouseOverProperty, mouseOutOfProperty } from '../../actions'

class settingsAccordian extends React.Component {

    constructor(props) {
        super(props)
        this.state = { activeIndex: [0] }
    }

    handleTitleClick = (e, titleProps) => {
        const index = titleProps.index
        const activeIndexAry = this.state.activeIndex

        if (activeIndexAry.includes(index)) {
            activeIndexAry.splice(activeIndexAry.indexOf(index))
            this.setState({ activeIndex: activeIndexAry })
        } else {
            // let activeIndexes = activeIndexAry.concat(index) 
            this.setState({ activeIndex: activeIndexAry.concat(index) })
        }
        console.log('this is the state', this.state)
    }

    onMouseEnter = (e) => {
        // console.log(e)
        this.props.mouseOverProperty(e.target.parentNode.id)
    }

    onMouseLeave = (e) => {
        this.props.mouseOutOfProperty()
    }

    render() {
        return (
            <Accordion
                // defaultActiveIndex={[0, 2]}
                // panels={this.panels}

                exclusive={false}
                fluid
                styled
                className=""
                style={{ width: "50%" }}
            >
                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    id="addColumn">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(0)}
                        index={0}
                        className="test-header"
                    >
                        <Icon name='dropdown' />
                        Insert Columns
                    </Accordion.Title>
                    <Accordion.Content className="test-content" active={this.state.activeIndex.includes(0)}>
                        Insert columns here
                    </Accordion.Content>
                </div>


                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    id="some Other Property">
                    <Accordion.Title
                        onClick={this.handleTitleClick}
                        active={this.state.activeIndex.includes(1)}
                        index={1}
                    >
                        <Icon name='dropdown' />
                    Insert Columns
                    </Accordion.Title>
                    <Accordion.Content active={this.state.activeIndex.includes(1)}>
                        Insert columns here
                    </Accordion.Content>
                </div>


            </Accordion>
        )

    }
}


export default connect(null, {mouseOverProperty , mouseOutOfProperty})(settingsAccordian);