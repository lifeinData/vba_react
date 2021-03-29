import { combineReducers } from 'redux';
import columnChoicesReducer from './columnChoicesReducer';
import { menuOptions, vaultTemplateCode, vaultTagValues } from './vaultBuilderReducer';
import { overallAppState } from './appStateReducer';

export default combineReducers({
  'columnChoices': columnChoicesReducer,
  'vaultSessionMenuData': menuOptions,
  'appState': overallAppState,
  'templateCode': vaultTemplateCode,
  'templateTags': vaultTagValues
});
