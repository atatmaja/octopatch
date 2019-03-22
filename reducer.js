import createReducer from './createReducer'
import * as types from './actionTypes'

//not yet working
export default appState = createReducer({}, {
    [types.TEST_ACTION](state, action){
        const newState = Object.assign({}, state);
        newState.log = action.msg;
        return newState;
    },
});