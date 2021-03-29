// tells the state of the app whether its in viewer or editor mode
export const overallAppState = (state={'viewerMode':true, 
                                       'templateSubmittedFlag':'',
                                       'menuClickedFlag': '',
                                       'menuIdSelected':'',
                                       'vaultid':'',
                                       'functionSelected':'overall_descrip'}, action) => {
    switch (action.type) {
        case 'VIEWER_MODE_CHANGE':
            state['viewerMode'] = action.payload
            return {...state}

        case 'GET_VAULT_ID':
            state['vaultid'] = action.payload
            return {...state}
        
        case 'TEMPLATE_CODE_SUBMIT':
            return {...state, 'templateSubmittedFlag' : action.payload}
        
        case 'MENU_CLICKED_FLAG':
            return {...state, 'menuClickedFlag': action.payload}

        case 'TEMPLATE_FUNCTION_CLICK': 
            return {...state, 'functionSelected':action.payload}

        case 'PARSE_MENU_ITEM':
            return {...state, 'menuIdSelected':action.payload}

        default:
            return state
    }
}