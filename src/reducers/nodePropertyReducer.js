
const nodePropertyReducer = (state={}, action) => {
    switch (action.type) {
        case 'MODIFY_NODE_PROPERTY':
            return {...state, ...action.payload}
        case 'NEW_NODE_PROPERTY':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default nodePropertyReducer;