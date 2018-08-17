import * as Types from './../constants';
import Axios from "./../utils/function";
import { types } from 'util';
export const getChoiceQuestion = (number) => {
        return {
                type: Types.GET_CHOICE_QUESTION,
                number
        }
}
export const getIQQuestion = (number) => {
        return {
                type: Types.GET_IQ_QUESTION,
                number
        }
}

export const getRank = (data) => {
        return {
                type: Types.GET_RANK,
                data
        }
}

export const getRankRequest = (name) => {
        return dispatch => {
                return Axios('/get-rank', 'GET', null).then(res => {
                        dispatch(getRank(res.data));
                })
        }

}


