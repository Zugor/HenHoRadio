import { questionConstants } from "../constants";

export function answeredQuestion(state={},action){
    
    switch(action.type){
        case questionConstants.ANSWERED_QUESTION_REQUEST:
            return {
                loading: true
            }
        case questionConstants.UPDATE_ANSWERED_QUESTION_REQUEST:
            return {
                loading: true
            }
        case questionConstants.DELETE_ANSWERED_QUESTION_REQUEST:
            return {
                loading: true
            }

        case questionConstants.ANSWERED_QUESTION_SUCCESS:
            return {
                data: action.question
            }
        case questionConstants.UPDATE_ANSWERED_QUESTION_SUCCESS:
            return {
                data: action.question
            }
        case questionConstants.DELETE_ANSWERED_QUESTION_SUCCESS:
            return {
                data: action.question
            }

        case questionConstants.ANSWERED_QUESTION_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case questionConstants.UPDATE_ANSWERED_QUESTION_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case questionConstants.DELETE_ANSWERED_QUESTION_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }

        default:
            return state;
    }
    
}