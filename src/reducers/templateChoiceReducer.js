const templateChoiceReducer = (state={'templateChoiceClicked': false, 'data': '', 'templateID':''}, action) => {
    switch (action.type) {
        case 'GET_TEMPLATE_OPTIONS':
            state['data'] = {...state['data'], ...action.payload} 
            return {...state}

        case 'TEMPLATE_OPTION_CLICKED':
            return {...state, ...action.payload}

        case 'TEMPLATE_OPTION_CHOICE':
            state['templateID'] = action.payload
            return {...state}

        default:
            return state
    }
}

export default templateChoiceReducer;