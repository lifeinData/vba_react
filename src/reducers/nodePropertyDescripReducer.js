const nodePropertyDescription = (state=[], action) => {
    switch (action.type) {
        case "MOUSEOVER_PROPERTY":
            return [...state, action.payload]

        case "MOUSEOUT_PROPERTY":
            return []
        default:
            return state
    }
}

export default nodePropertyDescription