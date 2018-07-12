import { questionConstants } from "../constants";

export function questionImprove(state={},action){
    
    switch(action.type){
        case questionConstants.GET_QUESTION_IMPROVE_REQUEST:
            return {
                loading: true
            }
        case questionConstants.SKIP_QUESTION_IMPROVE_REQUEST:
            return {
                loading: true
            }

        case questionConstants.GET_QUESTION_IMPROVE_SUCCESS:
            //console.log(state);
            return {
                data: action.question
            }
        case questionConstants.SKIP_QUESTION_IMPROVE_SUCCESS:
            //console.log(state);
            return {
                data: action.question
            }

        case questionConstants.GET_QUESTION_IMPROVE_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case questionConstants.SKIP_QUESTION_IMPROVE_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }

        default:
            return state;
    }
    
}