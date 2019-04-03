import createReducer from '../createReducer'
import * as types from '../actions/types'


export const patients = createReducer({}, {
    [types.SAVE_PATIENT_HR](state, action){
        const newState = Object.assign({}, state);
        newState.hr = action.hr;
        //sketchy demo code to make sure isStressed persists for a while if true
        if(!newState.isStressed){
            newState.isStressed = action.isStressed;
        }
        return newState;
    }
});