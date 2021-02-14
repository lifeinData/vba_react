const highlightCodeReducer = (state='overall_descrip', action) => {
    switch (action.type) {
        case 'ADD_HIGHLIGHT_SECTION':
            // return {...state, ...action.payload}
            return action.payload
        default:
            return state
    }
}

export default highlightCodeReducer;