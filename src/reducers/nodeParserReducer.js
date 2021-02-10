const nodeParserReducer = (state='a', action) => {
    switch (action.type) {
        case 'PARSE_NODE_REQUEST':
            return action.payload
        default:
            return state
    }
}

export default nodeParserReducer;