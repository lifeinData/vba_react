// tells the state of the app whether its in viewer or editor mode
export const overallAppState = (state={'viewerMode':true, 
                                       'templateSubmittedFlag':false,
                                       'menuClickedFlag': false,
                                       'vaultid':''}, action) => {
    switch (action.type) {
        case 'VIEWER_MODE_CHANGE':
            state['viewerMode'] = action.payload
            return {...state}

        case 'GET_VAULT_ID':
            state['vaultid'] = action.payload
            return {...state}
        
        case 'TEMPLATE_CODE_SUBMIT':
            return {...state, 'templateSubmittedFlag' : action.payload}

        default:
            return state
    }
}