import parseRequestAxio from '../apis/parseRequest'
import hljs from 'highlight.js';
// import '../components/mainAppLayout/node_modules/highlight.js/styles/github.css';
import hljsVba from 'highlight.js/lib/vba';
// console.log(hljs)

const getInitialNodeProp = (nodeID) => {
    // move this into another file at some point
    let nodePropObj = {}
    //bunch of rules here for intiail node property
    let nodeClass = nodeID.split('-')[0]
    
    if (nodeClass == 'dqNum') {
        nodePropObj[nodeID] = {
            columns: '',
            error_flag: ''
        }
    
    }

    return nodePropObj
}

export const addNodeToFlow = (mainFlowNodes) => {
    let nodeID = Object.keys(mainFlowNodes)[0]

    let newNode = {...mainFlowNodes, ...getInitialNodeProp(nodeID)}
    return {
        type: 'ADD_NODE',
        payload: newNode
    }
}

export const modifyNodeProperty = (nodeClass, changedProps) => {
    let payload = {}
    payload[nodeClass] = changedProps

    return {
        type: 'MODIFY_NODE_PROPERTY',
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

export const parseTemplateRequest = (heading, templateId) => {
    return async (dispatch, getState) => {
        let response = await parseRequestAxio.get('/getTemplate/', {params : {'heading': heading, 
                                                                              'template_id': templateId}});
        // console.log(response)
        dispatch({ type: "PARSE_TEMPLATE_CODE", payload: response.data});
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        hljs.registerLanguage("vba", hljsVba);
      }
}

export const mouseOverProperty = (propertyType) => {
    return {
        type: "MOUSEOVER_PROPERTY",
        payload: propertyType
    }
}

export const mouseOutOfProperty = (propertyType) => {
    return {
        type: "MOUSEOUT_PROPERTY"
    }
}

export const columnDropDownSubmit = (columnList) => {
    return {
        type: "COLUMN_LIST_SUBMIT",
        payload: columnList
    }
}

export const columnTypeChanged = (newType) => {
    return {
        type: 'COLUMN_TYPE_CHANGED',
        payload: newType
    }
}

export const templateFunctionBreakdownSelect = (func_name) => {
    return {
        type: 'ADD_HIGHLIGHT_SECTION',
        payload: func_name
    }
}

export const toggleInsertColumn = (toggleStatus) => {
    return {
        type: 'TOGGLE_INSERT_COLUMN',
        payload: toggleStatus
    }
}

export const parseTemplateOptions = () => {
    return async (dispatch) => {
        const response = await (parseRequestAxio.get('/menuOptions/'))
        dispatch({type: 'GET_TEMPLATE_OPTIONS', payload: response.data})
    }
}

export const templateOptionClicked = () => {
    return {
        type: 'TEMPLATE_OPTION_CLICKED',
        payload: {'templateChoiceClicked': true}
    }
}