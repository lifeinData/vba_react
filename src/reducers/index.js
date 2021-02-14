import { combineReducers } from 'redux';
import mainFlowReducer from './mainFlowReducer';
import nodePropertyReducer from './nodePropertyReducer';
import selectedNodeReducer from './selectedNodeReducer';
import selectedMenuOptionReducer from './selectedMenuOptionReducer';
import templateCodeInfoReducer from './templateCodeReducer';
import nodePropertyDescrip from './nodePropertyDescripReducer';
import columnChoicesReducer from './columnChoicesReducer';
import highlightCodeReducer from './highlightCodeReducer';

export default combineReducers({
  'mainFlowNodes': mainFlowReducer,
  'nodeProperty': nodePropertyReducer,
  'selectedNode': selectedNodeReducer,
  'selectedMenuOptionReducer': selectedMenuOptionReducer,
  'templateCodeInfo': templateCodeInfoReducer,
  'nodePropertyDescrip': nodePropertyDescrip,
  'columnChoices': columnChoicesReducer,
  'funcInfoSelected': highlightCodeReducer
});
