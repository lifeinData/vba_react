import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setVaultID, vaultTemplateSubmitted } from "../../../actions";
import parseRequestAxio from "../../../apis/parseRequest";
import { Button, Label } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const TemplateInputArea = (props) => {
  let history = useHistory();
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [postStatus, setPostStatus] = useState(false);
  const [editorPw, setEditorPw] = useState("");

  useEffect(() => {
    setEditorPw(makeid(4));
    console.log("use effect ran on templateInputArea");
  }, []);

  const resetVault = () => {
    let tmp_vaultid;
    tmp_vaultid = makeid(8);
    history.push("/vaultID/" + tmp_vaultid);
    props.setVaultID(tmp_vaultid);
  };

  const validateInputs = (inputValues) => {
    let error;

    const getErrorMessage = (mode, parsingType = null) => {
      // let parsingRegexBegin = new RegExp("(?<!_\n)^((private |public |friend |static )*)" + mode + ".+", 'gim')
      let parsingRegexBegin = new RegExp(
        "(?<!_\n)^((private |public |friend |static )*)(" + mode + " ).+$",
        "gim"
      );
      let parsingRegexEnd = new RegExp("(?<!_\\n)^end " + mode + ".*", "gim");
      let parsingStatus = { codeExists: false, errorMsg: null };
      let parsingResultBegin = inputValues.match(parsingRegexBegin);
      let parsingResultEnd = inputValues.match(parsingRegexEnd);

      console.log("parsing results  ", parsingResultBegin, parsingResultEnd);

      if (parsingResultBegin || parsingResultEnd) {
        parsingStatus["codeExists"] = true;
      }

      if (parsingStatus["codeExists"]) {
        if (
          !parsingResultBegin ||
          !parsingResultEnd ||
          parsingResultBegin.length !== parsingResultEnd.length
        ) {
          parsingStatus["errorMsg"] =
            "One or more of your " + mode + " is not closed";
        }
      }

      return parsingStatus;
    };

    let functionParsingStatus = getErrorMessage("function");
    let subParsingStatus = getErrorMessage("sub");
    if (
      !functionParsingStatus["codeExists"] &&
      !subParsingStatus["codeExists"]
    ) {
      error = "The code input area cannot be empty";
    }

    if (functionParsingStatus["errorMsg"]) {
      error = functionParsingStatus["errorMsg"];
    }

    if (subParsingStatus["errorMsg"]) {
      error = subParsingStatus["errorMsg"];
    }

    return error;
  };

  const validateCateName = (values) => {
    let errors;
    if (values === "test") {
      errors = "this is supposed to happen";
    } else if (!values) {
      errors = "no input here";
    }

    return errors;
  };

  const validateTemplateName = (values) => {
    let errors;
    if (!values) {
      errors = "Must have an input here";
    }

    return errors;
  };

  const postNewVault = async (values) => {
    values["vaultID"] = props.vaultID;
    let response = await parseRequestAxio.post(
      "/postNewVaultTemplate/",
      values
    );
    if (props.templateCodeFlag) {
      props.vaultTemplateSubmitted(false);
    } else {
      props.vaultTemplateSubmitted(true);
    }
  };

  const displayAreaSize = () => {
    if (props.viewerMode) {
      return "column2-area active";
    } else {
      return "column2-area";
    }
  };

  const handleClose = () => {
    setPasswordDisplay(false);
  };

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const generateEditPassword = () => {
    console.log("generate Edit Password loaded");
    if (passwordDisplay && !postStatus) {
      console.log("this is the post status ==>", postStatus);
      parseRequestAxio.post("/postEditPassword/", {
        vaultId: props.vaultID,
        editorPw: editorPw,
      });
      setPostStatus(true);
    }

    return null;
  };

  const showEditPassword = () => {
    if (postStatus) {
      return <h1>{editorPw}</h1>;
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="set-pw-modal-cont"
        open={passwordDisplay}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={passwordDisplay}>
          <div className="show-pw-modal">
            <h1>
              COPY DOWN THIS PASSWORD AS IT WILL ALLOW YOU TO DELETE TEMPLATES
            </h1>
            {generateEditPassword()}
            {showEditPassword()}
          </div>
        </Fade>
      </Modal>
      <Formik
        initialValues={{
          vbaInput: "",
          templateNameInput: "",
          templateCateInput: "",
        }}
        onSubmit={
          (values) => {
            values.templateCateInput =
              values.templateCateInput === ""
                ? "All Category"
                : values.templateCateInput;
            postNewVault(values);
            if (props.firstTimeLoad) {
              console.log("showPasswordIdsplay shows up");
              setPasswordDisplay(true);
            }
          } // }
        }
        validateOnChange={false}
      >
        {({ errors, touched, validateField, values, validateForm }) => (
          <div className={displayAreaSize()}>
            <Form className="vba-codeinput">
              <div className="input-options-cont">
                <div>
                  <label
                    className="inputTemplateLabel"
                    htmlFor="templateCateInput"
                  >
                    Template Category Name:
                  </label>
                  <Field
                    id="templateCateInput"
                    name="templateCateInput"
                    className="templateShortInput"
                    placeholder='Defaults to "All Category"'
                    value={values.templateCateInput}
                  />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <label
                    className="inputTemplateLabel"
                    htmlFor="templateNameInput"
                  >
                    Template Name:
                  </label>
                  <Field
                    validate={validateTemplateName}
                    id="templateNameInput"
                    name="templateNameInput"
                    className="templateShortInput"
                    value={values.templateNameInput}
                  />
                </div>
                {errors.templateNameInput && touched.templateNameInput && (
                  <Label id="template-name-error" basic color="red" pointing>
                    {errors.templateNameInput}
                  </Label>
                )}

                <div className="inputAreaTitle">
                  <label className="inputTemplateLabel" htmlFor="vbaInput">
                    Input your vba code
                  </label>
                  <Button id="add-code-btn" type="submit" basic color="blue">
                    {" "}
                    Add Code{" "}
                  </Button>
                </div>
              </div>
              {errors.vbaInput && touched.vbaInput && (
                <Label id="template-input-error" basic color="red">
                  {errors.vbaInput}
                </Label>
              )}
              <Field
                validate={validateInputs}
                as="textarea"
                id="vbaInput"
                name="vbaInput"
                className="vba-code-textarea"
                placeholder="VBA Code Here"
                value={values.vbaInput}
              />
            </Form>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    vaultID: state.appState["vaultid"],
    templateCodeFlag: state.appState["templateSubmittedFlag"],
    viewerMode: state.appState["viewerMode"],
    firstTimeLoad: state.appState["firstTimeLoad"],
  };
};
export default connect(mapStateToProps, { setVaultID, vaultTemplateSubmitted })(
  TemplateInputArea
);
