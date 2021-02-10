const highlightCodeReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_HIGHLIGHT_SECTION':
            let newState = action.payload 
            return action.payload
        default:
            return state
    }
}

export default highlightCodeReducer;