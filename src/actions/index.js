import parseRequestAxio from '../apis/parseRequest'

// Vault builder actions will replace old actions later
export const vaultMenuParseMenuItem = (menuId) => {
    return {
        type: 'PARSE_MENU_ITEM',
        payload: menuId
    }
}

export const vaultFunctionClicked = (functionid) => {
    return {
        type: 'TEMPLATE_FUNCTION_CLICK',
        payload: functionid
    }
}

export const vaultTemplateSubmitted = (flag) => {
    return {
        type: 'TEMPLATE_CODE_SUBMIT',
        payload: flag
    }
}

export const vaultViewSwitch = (flag) => {
    return {
        type: 'VIEWER_MODE_CHANGE',
        payload: flag
    }
}

export const vaultMenuClickFlag = (flag) => {
    return {
        type: "MENU_CLICKED_FLAG",
        payload: flag
    }
}

export const vaultTagValueParse = (vaultID, templateID) => {
    return async (dispatch) => {
        let response = await parseRequestAxio.get('/getVaultInfo/', {params : {'mode': 'tags', 
                                                                               'vaultID': vaultID,
                                                                               'template_id': templateID}})
        dispatch({ type:"PARSE_VAULT_TAGS", payload: response.data})
    }
}

export const vaultMenuClickParse = (vaultID, templateID) => {
    return async (dispatch) => {
        let response = await parseRequestAxio.get('/getVaultInfo/', {params : {'mode': 'display', 
                                                                               'vaultID': vaultID,
                                                                               'template_id': templateID}})
        dispatch({ type:"PARSE_VAULT_TEMPLATE", payload: response.data})
    }
}

export const vaultGetMenuStruct = (vaultID) => {
    return async (dispatch) => {
        let response = await parseRequestAxio.get('/getVaultInfo/', {params : {'mode': 'menu', 'vaultID': vaultID}})
        dispatch({ type:"PARSE_VAULT_MENU", payload: response.data})
    }
}

export const setVaultID = (vaultID) => {
    return {
        type: 'GET_VAULT_ID',
        payload: vaultID
    }
}

export const vaultGetDisplayOptions = (vaultID) => {
    return async (dispatch) => {
        let response = await parseRequestAxio.get('/getVaultInfo/', {params : {'mode': 'display', 'vaultID': vaultID}})
        dispatch({ type:"PARSE_VAULT_MENU", payload: response.data})
    }
}

export const parseTemplateRequest = (heading, templateId) => {
    return async (dispatch, getState) => {
        let response = await parseRequestAxio.get('/getTemplate/', {params : {'heading': heading, 
                                                                              'template_id': templateId}});
        dispatch({ type: "PARSE_TEMPLATE_CODE", payload: response.data});

      }
}

export const setFirstTimeLoad = (status) => {
    return {
        type: 'SET_FIRST_TIME_LOAD',
        payload: status
    }
}

export const mouseOverProperty = (propertyType) => {
    return {
        type: "MOUSEOVER_PROPERTY",
        payload: propertyType
    }
}

export const mouseOutOfProperty = (propertyType) => {
    return {
        type: "MOUSEOUT_PROPERTY"
    }
}

export const columnDropDownSubmit = (columnList) => {
    return {
        type: "COLUMN_LIST_SUBMIT",
        payload: columnList
    }
}

export const columnTypeChanged = (newType) => {
    return {
        type: 'COLUMN_TYPE_CHANGED',
        payload: newType
    }
}

export const templateFunctionBreakdownSelect = (func_name) => {
    return {
        type: 'ADD_HIGHLIGHT_SECTION',
        payload: {'funcTitle':func_name}
    }
}

export const toggleInsertColumn = (toggleStatus) => {
    return {
        type: 'TOGGLE_INSERT_COLUMN',
        payload: toggleStatus
    }
}

export const parseTemplateOptions = () => {
    return async (dispatch) => {
        const response = await (parseRequestAxio.get('/menuOptions/'))
        dispatch({type: 'GET_TEMPLATE_OPTIONS', payload: response.data})
    }
}

export const templateOptionClicked = () => {
    return {
        type: 'TEMPLATE_OPTION_CLICKED',
        payload: {'templateChoiceClicked': true}
    }
}

export const templateCodeChoice = (headerID, templateID) => {
    return {
        type: 'TEMPLATE_OPTION_CHOICE',
        payload: {headerID: headerID, templateID: templateID}
    }
}

export const selectedFuncBlock = (funcBlock) => {
    return {
        type: 'SELECTED_FUNC_BLOCK',
        payload: {'funcBlock' : funcBlock}
    }
}

export const deleteMenuOption = (cateHeading, subHeading, templateHeading, vaultid, templateId) => {
    return async (dispatch) => {
        await (parseRequestAxio.get('/deleteVault/', {params:{
                                                                vaultID: vaultid,
                                                                template_id: templateId,
                                                                sub_heading: subHeading,
                                                                mode : 'delete'
                                                            }
                                                    }))
        dispatch({type: 'DELETE_MENU_OPTION', payload: {'cateHeading': cateHeading, 'subHeading': subHeading, 'templateHeading': templateHeading}})
    }
}