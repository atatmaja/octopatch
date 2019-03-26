import * as types from "./types";

export function test(){
    return(dispatch, getState) => {
        const testObj = {msg: "Test successful"};
        //create some test object to pass into the action
        dispatch(testDispatch(testObj));
    }
}

export function testDispatch(testObj){
    return{
        type: types.TEST_ACTION,
        testObj
    }
}