import * as types from "./types";

export function updateHR(hr, isStressed){
    return(dispatch, getState) => {
        console.log(hr);
        dispatch(saveHR(hr, isStressed));
    }
}

export function saveHR(hr, isStressed){
    return{
        type: types.SAVE_PATIENT_HR,
        hr,
        isStressed
    }
}