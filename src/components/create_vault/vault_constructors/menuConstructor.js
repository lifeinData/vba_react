import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Resizable } from "re-resizable";
import {
  deleteMenuOption,
  setFirstTimeLoad,
  vaultMenuParseMenuItem,
  vaultGetMenuStruct,
  vaultTagValueParse,
  vaultMenuClickParse,
  vaultMenuClickFlag,
  vaultViewSwitch,
} from "../../../actions";
import { Accordion, Icon, Button, Label } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import Switch from "react-switch";
import SetEditorPwModal from "./decorator_component/setPasswordModal";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import parseRequestAxio from "../../../apis/parseRequest";
import redX from "../../../images/red_x.png";
// import EditorPwModalForm from './decorator_component/enterEditorPwModal';
import { Formik, Form, Field } from "formik";

const VaultMenu = (props) => {
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [editorPwStatus, setEditorPwStatus] = useState(false);

  useEffect(() => {
    console.log("templateCodeFlag useeffect triggered ");
    props.vaultGetMenuStruct(props.vaultid);
  }, [props.templateCodeFlag, props.vaultid]);

  useEffect(() => {
    if (Object.keys(props.menuOptions).length === 0) {
      props.setFirstTimeLoad(true);
      props.vaultViewSwitch(false);
    } else {
      props.vaultViewSwitch(true);
      props.setFirstTimeLoad(false);
    }
  }, [props.menuOptions, props.menuItemSelected, props.vaultMenuClicked]);

  const deleteButtonClick = (
    cateHeading,
    subHeading,
    templateHeading,
    templateId
  ) => {
    props.deleteMenuOption(
      cateHeading,
      subHeading,
      templateHeading,
      props.vaultid,
      templateId
    );
  };

  const transformToSubheading = (key) => {
    let subheading = [];
    console.log("transform to subheading runs  ", props.menuItemSelected);
    for (let choice of Object.keys(props.menuOptions[key])) {
      if (choice !== "id") {
        let menuHeadingId = props.menuOptions[key]["id"];
        let menuid = props.menuOptions[key][choice]["id"];
        subheading.push(
          <div className="menu-choice-subheading-cont">
            <Link
              className="subheading-link"
              to={"/vaultID/" + props.vaultid + "/" + menuid}
              onClick={handleMenuClick}
            >
              <p
                className={menuid === props.menuItemSelected ? "active" : ""}
                id={menuid}
                key={menuid}
              >
                {choice}
              </p>
            </Link>
            {editorPwStatus && !props.viewerMode && (
              <img
                onClick={() => {
                  deleteButtonClick(key, menuHeadingId, choice, menuid);
                }}
                src={redX}
                alt="delete_btn"
                className="delete-btn"
              />
            )}
          </div>
        );
      }
    }

    return subheading;
  };

  const switchDisabled = () => {
    if (Object.keys(props.menuOptions).length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleMenuClick = (e) => {
    console.log("menu item clicked");
    props.vaultMenuClickParse(props.vaultid, e.target.id);
    props.vaultTagValueParse(props.vaultid, e.target.id);
    if (props.vaultMenuClicked) {
      props.vaultMenuClickFlag(false);
    } else if (!props.vaultMenuClicked) {
      props.vaultMenuClickFlag(true);
    }

    props.vaultMenuParseMenuItem(e.target.id);
    props.vaultViewSwitch(true);
  };

  const transformToMenu = () => {
    if (Object.keys(props.menuOptions).length !== 0) {
      let templateChoiceCate = [];
      let index = 0;
      for (let category of Object.keys(props.menuOptions)) {
        if (category !== "id") {
          templateChoiceCate.push(
            <React.Fragment>
              <Accordion.Title
                active={true}
                index={index}
                className="menu-header-h1 menu-choice"
              >
                <Icon name="dropdown" />
                {category.toUpperCase()}
              </Accordion.Title>
              <Accordion.Content key={category} active={true}>
                {transformToSubheading(category)}
              </Accordion.Content>
            </React.Fragment>
          );
          index += 1;
        }
      }

      return templateChoiceCate;
    } else {
      return (
        <div>
          <h1>NO DATA</h1>
        </div>
      );
    }
  };

  const showSetPwModal = () => {
    if (showModal) {
      return <SetEditorPwModal />;
    } else {
      return null;
    }
  };

  const validateEditorPw = async (value) => {
    let error;
    let resp = await parseRequestAxio.get("/validateEditPw/", {
      params: { mode: "m", vaultID: props.vaultid, editorPw: value },
    });
    if (resp.data["valid_pw"] !== "valid") {
      error = "This password is incorrect";
    }

    return error;
  };

  const editorConfigBox = () => {
    console.log("editorConfigBox rendered");
    if (!props.firstTimeLoad && !editorPwStatus) {
      return (
        <div className="editor-optn-cont">
          <Button
            basic
            color="blue"
            onClick={() => {
              setShowModal(true);
            }}
            className="config-btn"
          >
            Enter Password for Editing Privileges
          </Button>
        </div>
      );
    } else if (props.firstTimeLoad || editorPwStatus) {
      return (
        <div className="editor-optn-cont">
          <div>
            <label className="editor-switch-cont" htmlFor="material-switch">
              <p className="switch-lbl">Editor Mode</p>
              <Switch
                checked={!props.viewerMode}
                onChange={() => {
                  props.vaultViewSwitch(
                    props.viewerMode === true ? false : true
                  );
                }}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                disabled={switchDisabled()}
                className="react-switch"
                id="material-switch"
              />
            </label>
          </div>
        </div>
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="set-pw-modal-cont"
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <React.Fragment>
            <Formik
              initialValues={{
                initialPw: "",
              }}
              onSubmit={() => {
                setEditorPwStatus(true);
                setShowModal(false);
              }}
              validateOnChange={false}
            >
              {({ values, errors, touched }) => (
                <Form className="set-pw-form">
                  <p className="set-pw-maintitle">
                    Enter the password for editing permissions
                  </p>
                  <Field
                    type="password"
                    id="initialPw"
                    name="initialPw"
                    value={values.initialPw}
                    validate={validateEditorPw}
                  ></Field>
                  {errors.initialPw && touched.initialPw && (
                    <div>{errors.initialPw}</div>
                  )}
                  <Button type="submit" basic color="blue">
                    {" "}
                    Click for Editor Privileges{" "}
                  </Button>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Fade>
      </Modal>
      <Resizable
        defaultSize={{
          width: 344,
          height: "calc(100vh - 44px)",
        }}
        className="menu-choice-container"
        minWidth="330px"
        maxWidth="677px"
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <Accordion exclusive={false} className="menu-choice-header-h1">
          {transformToMenu()}
          {editorConfigBox()}
        </Accordion>
      </Resizable>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state.appState);
  return {
    menuOptions: state.vaultSessionMenuData["data"],
    viewerMode: state.appState["viewerMode"],
    templateCodeFlag: state.appState["templateSubmittedFlag"],
    vaultMenuClicked: state.appState["menuClickedFlag"],
    vaultid: state.appState["vaultid"],
    menuItemSelected: state.appState["menuIdSelected"],
    firstTimeLoad: state.appState["firstTimeLoad"],
  };
};

export default connect(mapStateToProps, {
  deleteMenuOption,
  setFirstTimeLoad,
  vaultMenuParseMenuItem,
  vaultTagValueParse,
  vaultGetMenuStruct,
  vaultMenuClickParse,
  vaultMenuClickFlag,
  vaultViewSwitch,
})(VaultMenu);
