export const menuOptions = (state={'data':'', 'vaultid':''}, action) => {
    switch (action.type) {
        case 'PARSE_VAULT_MENU':
            state['data'] = action.payload
            return {...state}
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