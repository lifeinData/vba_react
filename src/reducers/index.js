import { combineReducers } from 'redux';
import mainFlowReducer from './mainFlowReducer';
import nodePropertyReducer from './nodePropertyReducer';
import selectedNodeReducer from './selectedNodeReducer';
import selectedMenuOptionReducer from './selectedMenuOptionReducer';
import parseNodeRequest from './nodeParserReducer';
import nodePropertyDescrip from './nodePropertyDescripReducer';
import columnDropDownReducer from './columnDropDownReducer';

export default combineReducers({
  'mainFlowNodes': mainFlowReducer,
  'nodeProperty': nodePropertyReducer,
  'selectedNode': selectedNodeReducer,
  'selectedMenuOptionReducer': selectedMenuOptionReducer,
  'parsedNodeMacro': parseNodeRequest,
  'nodePropertyDescrip': nodePropertyDescrip,
  'columnDropDownReducer': columnDropDownReducer
});
