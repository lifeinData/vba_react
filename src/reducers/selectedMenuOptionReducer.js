const selectedMenuReducer = (state='overall_descrip', action) => {
    switch (action.type) {
        case 'SELECT_MENU_OPTION':
            return action.payload
        default: 
            return state
    }
}

export default selectedMenuReducer;