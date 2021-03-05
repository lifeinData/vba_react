const highlightCodeReducer = (state={'funcTitle' : 'overall_descrip', 'funcBlock':''}, action) => {
    switch (action.type) {
        case 'ADD_HIGHLIGHT_SECTION':
            return {...state, ...action.payload}
        case 'SELECTED_FUNC_BLOCK':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default highlightCodeReducer;