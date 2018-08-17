import { combineReducers } from 'redux';
import user from "./user";
import questions from "./questions";
import getRank from "./result";
const appReducers = combineReducers({
    user,questions,getRank
});

export default appReducers;