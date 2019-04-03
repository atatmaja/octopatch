import * as types from "./types";

export function updateNotif(notification){
    return(dispatch, getState) => {
        dispatch(saveNotif(notification));
    }
}

export function saveNotif(newNotif){
    return{
        type: types.SAVE_NOTIF,
        newNotif
    }
}