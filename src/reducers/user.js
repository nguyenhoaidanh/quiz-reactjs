import * as Types from './../constants';

var initialState = {
    username:"Danh",
    password:"123",
    avatar:"xxxx"
};

const user = (state = initialState, action) => {
  
    switch(action.type){
        case Types.LOGIN:
            return state;
        default:
            return state;
    }
}

export default user;