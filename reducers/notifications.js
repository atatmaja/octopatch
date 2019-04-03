import createReducer from '../createReducer'
import * as types from '../actions/types'


export const notifications = createReducer({}, {
    [types.SAVE_NOTIF](state, action){
        newState = [...state];
        //just push one notif so it doesn't clutter, sketchy but for demo purposes lmao
        if(newState.length === 0){
            newState.unshift(action.newNotif);
        }
        return newState;
    }
});