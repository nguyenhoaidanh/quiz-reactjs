import * as Types from './../constants';

var initialState = {
    iqResult:null,
    choiceResult:null
};


const getRank = (state = initialState, action) => {

    switch (action.type) {
        case Types.GET_RANK:
            return action.data;
      
        default:
            return state;
    }
}

export default getRank;