const INITIAL_STATE = {
    mainFlow : null
}

const mainFlowReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_NODE':
            return {...state, ...action.payload}
        case 'EDIT_NODE':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default mainFlowReducer;