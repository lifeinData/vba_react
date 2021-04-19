import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import { setVaultID } from '../../actions';
import AboutPage from '../about_page/index';
import CustomVaultBuild from '../create_vault/index';

const MainAppHeader = (props) => {

    // const [vaultID, setVaultID] = useState('');
    const [activeItem, setActiveItem] = useState("create-vault")
    
    function handleItemClick (e,a,b) {
        return (a.name)
    }

    useEffect(()=>{
        console.log('mainAppHeader useeffect ran')
    }, [activeItem])
    
    return (
        <React.Fragment>
            <Menu>
                {/*todo: vault-viewer => Special vault ID*/}
                <Menu.Item
                    onClick = {(e,a) => {setActiveItem(handleItemClick(e,a))}}
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
                <Menu.Item
                    onClick={(e,a) => {setActiveItem(handleItemClick(e,a))}}
                    name="create-vault"
                    active={activeItem === 'create-vault'}
                >
                <Link to={"/vaultID/" + (props.vaultID !== '' ? props.vaultID + '/' : '')}>
                    Create your own vault
                </Link>

                </Menu.Item>
            </Menu>

            <Switch>
                <Route exact path ="/">
                    <Redirect to="/about/"/>
                </Route>
                <Route exact path ="/about" component={AboutPage}></Route>
                <Route  path = "/vaultID/:id?/:templateid?" component={CustomVaultBuild}></Route>
            </Switch>
        </React.Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        'vaultID': state.appState['vaultid']
    }
}

export default connect(mapStateToProps, { setVaultID })(MainAppHeader);