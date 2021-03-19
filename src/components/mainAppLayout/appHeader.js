import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import { setVaultID } from '../../actions';
import MainAppLayout from './mainAppLayout';
import AboutPage from '../about_page/index';
import CustomVaultBuild from '../create_vault/index';

const MainAppHeader = (props) => {

    // const [vaultID, setVaultID] = useState('');
    const [activeItem, setActiveItem] = useState("vault-viewer")
    

    function makeid(length) {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function handleItemClick (e,a,b) {
        // console.log(a.name)
        return (a.name)
    }

    useEffect(()=>{
        let vaultIDExtract = /(?<=\/vaultID\/)(.{8})(?=\/)|(?<=\/vaultID\/)(.{8})/
        let vaultIDCapture = window.location.href.match(vaultIDExtract)

        if (vaultIDCapture != null) {
            props.setVaultID(vaultIDCapture[0])
            setActiveItem("create-vault")
        }

    }, [activeItem])

    
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
                <Menu.Item
                    onClick={(e,a) => {setActiveItem(handleItemClick(e,a))}}
                    name="create-vault"
                    active={activeItem === 'create-vault'}
                >
                <Link to={"/vaultID/" + props.vaultID + '/'}>
                    
                    Create your own vault
                    
                </Link>

                </Menu.Item>
            </Menu>

            <Switch>
                <Route exact path ="/">
                    <Redirect to="/home/"/>
                </Route>
                <Route path="/home/:id?" component={MainAppLayout}></Route>
                <Route exact path ="/about" component={AboutPage}></Route>
                <Route  path = "/vaultID/:id?/" component={CustomVaultBuild}></Route>

                
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