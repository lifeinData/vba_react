import { combineReducers } from 'redux';
import nodePropertyReducer from './nodePropertyReducer';
import selectedNodeReducer from './selectedNodeReducer';
import selectedMenuOptionReducer from './selectedMenuOptionReducer';
import templateCodeInfoReducer from './templateCodeReducer';
import nodePropertyDescrip from './nodePropertyDescripReducer';
import columnChoicesReducer from './columnChoicesReducer';
import highlightCodeReducer from './highlightCodeReducer';
import templateChoiceReducer from './templateChoiceReducer';
import { menuOptions, vaultTemplateCode } from './vaultBuilderReducer';
import { overallAppState } from './appStateReducer';

export default combineReducers({
  'nodeProperty': nodePropertyReducer,
  'selectedNode': selectedNodeReducer,
  'selectedMenuOptionReducer': selectedMenuOptionReducer,
  'templateCodeInfo': templateCodeInfoReducer,
  'nodePropertyDescrip': nodePropertyDescrip,
  'columnChoices': columnChoicesReducer,
  'funcInfoSelected': highlightCodeReducer,
  'templateChoice': templateChoiceReducer,
  'vaultSessionMenuData': menuOptions,
  'appState': overallAppState,
  'templateCode': vaultTemplateCode
});
