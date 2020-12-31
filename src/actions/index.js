export const addNode = (mainFlowNodes) => {
    return {
        type: 'ADD_NODE',
        payload: {mainFlow : mainFlowNodes}
    }
}

export const modifyNodeProperty = (nodeClass, {prop1, prop2}) => {
    const payload = {}
    payload[nodeClass] = {prop1:prop1, prop2:prop2}
    return {
        type: 'MODIFY_NODE_PROPERTY',
        payload: payload
    }
}

export const newNodeProperty = (nodeClass) => {
    const payload = {}
    payload[nodeClass] = {prop1:'', prop2:''}
    return {
        type: 'NEW_NODE_PROPERTY',
        payload: payload
    }
}

export const selectNode = (nodeClass) => {
    return {
        type: 'SELECT_NODE',
        payload: nodeClass
    }
}

export const selectMenu = (topic) => {
    return {
        type: 'SELECT_MENU_OPTION',
        payload: topic
    }
}