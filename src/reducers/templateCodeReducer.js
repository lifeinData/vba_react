const templateCodeReducer = (state='', action) => {
    switch (action.type) {
        case 'PARSE_TEMPLATE_CODE':
            return action.payload
        default:
            return state
    }
}

export default templateCodeReducer;