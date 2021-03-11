import React, { useState }from 'react';
import { Menu } from 'semantic-ui-react'
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import MainAppLayout from './mainAppLayout';
import AboutPage from '../about_page/index';

function handleItemClick (e,a,b) {
    console.log(a.name)
    return (a.name)
}

const MainAppHeader = () => {
    const [activeItem, setActiveItem] = useState("vault-viewer")
    return (
        <React.Fragment>
            <Menu>
                <Menu.Item
                    onClick={(e,a) => {setActiveItem(handleItemClick(e,a))}}
                    name="vault-viewer"
                    active={activeItem === 'vault-viewer'}
                >
                <Link to="/">
                    
                    Vault Viewer
                    
                </Link>

                </Menu.Item>
                <Menu.Item
                    onClick={(e,a) => {setActiveItem(handleItemClick(e,a))}}
                    name="about-page"
                    active={activeItem === 'about-page'}
                >
                <Link to="/about">
                    
                    What is this?
                    
                </Link>

                </Menu.Item>
                {/* <Menu.Item
                    onClick={(e,a) => {setActiveItem(handleItemClick(e,a))}}
                    name="vault-viewer"
                    active={activeItem === 'vault-viewer'}
                >
                <Link to="/">
                    Vault Viewer
                    
                </Link>
                </Menu.Item> */}
            </Menu>

            <Switch>
                <Route exact path ="/">
                    <Redirect to="/home/"/>
                </Route>
                <Route path="/home/:id?" component={MainAppLayout}></Route>

                <Route exact path ="/about" component={AboutPage}></Route>
            </Switch>
        </React.Fragment>
    )

}

export default MainAppHeader;