import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { Link, Route, Redirect, Switch, useHistory } from "react-router-dom";
import { setVaultID } from "../../actions";
import AboutPage from "../about_page/index";
import CustomVaultBuild from "../create_vault/index";
import TestPage from "./testPage";
import { makeid } from "../../utils/generate-id";

const MainAppHeader = (props) => {

  const [activeItem, setActiveItem] = useState("vault-viewer");
  let history = useHistory()
  // let vaultID = null

  useEffect(() => {
    console.log("mainAppHeader useeffect ran");
  }, [activeItem]);

  return (
    <React.Fragment>
      <Menu className="top-app-menu">
        {/*todo: vault-viewer => Special vault ID*/}
        <Menu.Item
          onClick={(syntheticE, menuProps) => {
            setActiveItem(menuProps.name);
          }}
          name="vault-viewer"
          active={activeItem === "vault-viewer"}
          className="top-menu-btn"
        >
          <Link
            to={"/vaultID/" + (props.vaultID !== "" ? props.vaultID + "/" : "")}
          >
            Vault Viewer
          </Link>
        </Menu.Item>

        <Menu.Item
          onClick={(syntheticE, menuProps) => {
            setActiveItem(menuProps.name);
          }}
          name="about-page"
          active={activeItem === "about-page"}
          className="top-menu-btn"
        >
          <Link to="/about">What is this?</Link>
        </Menu.Item>

        <Menu.Item
          onClick={(syntheticE, menuProps) => {
            history.push("/vaultID/" + makeid(8))
            
            // props.setVaultID(newVault);
            setActiveItem(menuProps.name);
          }}
          name="create-vault"
          active={activeItem === "create-vault"}
          className="top-menu-btn"
        >
          <Link
            to={"/vaultID/" + makeid(8) }
          >
            Create your own vault
          </Link>

        </Menu.Item>

        <Menu.Item
          onClick={(syntheticE, menuProps) => {
            history.push("/vaultID/" + makeid(8))
            setActiveItem(menuProps.name);
          }}
          name="test-page"
          active={activeItem === "test-page"}
          className="top-menu-btn"
        >
          <Link
            // onClick={() => {
            //   history.push("/vaultID/" + makeid(8));
            // }}
            to={"/testPage/" + makeid(8)}
          >
            Test Page
          </Link>
          
        </Menu.Item>

      </Menu>


        {/* <Route exact path="/vaultId/">
          <Redirect to="/about/" />
        </Route> */}
        <Route exact path="/about" component={AboutPage}></Route>
        {/* <Route
          path="/vaultID"
          component={CustomVaultBuild}
        >
        </Route> */}
        <Route path="/testpage/:id?/:templateid?" component={TestPage}></Route>
        <Route path="/vaultID/:id?/:templateid?" component={CustomVaultBuild}></Route>

    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    vaultID: state.appState["vaultid"],
  };
};

export default connect(mapStateToProps, { setVaultID })(MainAppHeader);
