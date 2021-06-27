export const menuOptions = (state={'data':'', 'vaultid':''}, action) => {
    switch (action.type) {
        case 'PARSE_VAULT_MENU':
            state['data'] = action.payload
            return {...state}

        case 'DELETE_MENU_OPTION':
            let newState;
            console.log('DELETE MENU OPTION ====>', action.payload.cateHeading, action.payload.templateHeading)
            delete state['data'][action.payload.cateHeading][action.payload.templateHeading]

            console.log('DELETE MENU OPTION LENGTH ====>', Object.keys(state['data'][action.payload.cateHeading]).length)
            if (Object.keys(state['data'][action.payload.cateHeading]).length === 1) {
                delete state['data'][action.payload.cateHeading]
            }
            
            newState = {...state['data']}
            return {...state, 'data': newState}

        default:
            return state
    }
}

export const vaultTemplateCode = (state={'data':''}, action) => {
    switch (action.type) {
        case 'PARSE_VAULT_TEMPLATE':
            return {...state, 'data': action.payload[0]}
        default:
            return state
    }
}

export const vaultTagValues = (state={'data': '', 'funcList': '', 'templateCode':''}, action) => {
    switch (action.type) {
        case 'PARSE_VAULT_TAGS':
            action.payload['templateCode'] = action.payload['template_code'][0]
            return {...state, ...action.payload}

        default:
            return state
    }
}