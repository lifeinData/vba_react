const selectedNodeReducer = (state='', action) => {
    switch (action.type) {
        case 'SELECT_NODE':
            return action.payload
        default:
            return state
    }
}

export default selectedNodeReducer;