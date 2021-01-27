// reducers for changing the property of the node
// todo: change later
const INITIAL_STATE = {
    mainFlow : null
}

const mainFlowReducer = (state={}, action) => {
    switch (action.type) {
        case 'ADD_NODE':
            return {...state, ...action.payload}
        case 'MODIFY_NODE_PROPERTY':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default mainFlowReducer;