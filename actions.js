import * as types from "./actionTypes";

export function test(){
    return(dispatch, getState) => {
        dispatch(testDispatch);
    }
}

export function testDispatch(){
    //create some test object to pass into the action
    const testObj = {msg: "Test successful"};
    return{
        type: types.TEST_ACTION,
        testObj
    }
}