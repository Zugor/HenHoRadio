import { questionConstants } from "../constants";

export function question(state={},action){
    
    switch(action.type){
        case questionConstants.GET_QUESTION_REQUEST:
            return {
                loading: true
            }
        case questionConstants.GET_QUESTION_AND_ANSWER_REQUEST:
            return {
                loading: true
            }
        case questionConstants.SKIP_QUESTION_REQUEST:
            return {
                loading: true
            }
        case questionConstants.ANSWER_QUESTION_REQUEST:
            return {
                loading: true
            }

        case questionConstants.GET_QUESTION_SUCCESS:
            //console.log(state);
            return {
                data: action.question
            }
        case questionConstants.GET_QUESTION_AND_ANSWER_SUCCESS:
            //console.log(state);
            return {
                data: action.question
            }
        case questionConstants.SKIP_QUESTION_SUCCESS:
            //console.log(state);
            return {
                data: action.question
            }
        case questionConstants.ANSWER_QUESTION_SUCCESS:
            return {
                data: action.question
            }

        case questionConstants.GET_QUESTION_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case questionConstants.GET_QUESTION_AND_ANSWER_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case questionConstants.SKIP_QUESTION_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case questionConstants.ANSWER_QUESTION_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }

        default:
            return state;
    }
    
}