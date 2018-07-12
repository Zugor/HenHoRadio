import { questionConstants } from "../constants";
import { questionService } from "../services";

export const questionActions={
    getQuestion,
    skipQuestion,
    answerQuestion,
    getAnsweredQuestion,
    getQuestionImprove,
    skipQuestionImprove,
}
function getQuestion(user_id){
    return dispatch=>{
        dispatch(request(user_id));
        questionService.getQuestion(user_id)
            .then(
                question   =>  dispatch(success(question)),
                error   =>  dispatch(failure(error))
        )
    }
    function request(user_id) { return { type : questionConstants.GET_QUESTION_REQUEST, user_id }}
    function success(question){ return { type: questionConstants.GET_QUESTION_SUCCESS, question }}
    function failure(error) { return { type: questionConstants.GET_QUESTION_FAILURE, error }}
}
function getQuestionImprove(user_id){
    return dispatch=>{
        dispatch(request(user_id));
        questionService.getQuestionImprove(user_id)
            .then(
                question   =>  dispatch(success(question)),
                error   =>  dispatch(failure(error))
        )
    }
    function request(user_id) { return { type : questionConstants.GET_QUESTION_IMPROVE_REQUEST, user_id }}
    function success(question){ return { type: questionConstants.GET_QUESTION_IMPROVE_SUCCESS, question }}
    function failure(error) { return { type: questionConstants.GET_QUESTION_IMPROVE_FAILURE, error }}
}
function skipQuestion(user_id){
    return dispatch=>{
        dispatch(request(user_id));
        questionService.getQuestion(user_id)
            .then(
                question   =>  dispatch(success(question)),
                error   =>  dispatch(failure(error))
        )
    }
    function request(user_id) { return { type : questionConstants.SKIP_QUESTION_REQUEST, user_id }}
    function success(question){ return { type: questionConstants.SKIP_QUESTION_SUCCESS, question }}
    function failure(error) { return { type: questionConstants.SKIP_QUESTION_FAILURE, error }}
}
function skipQuestionImprove(user_id){
    return dispatch=>{
        dispatch(request(user_id));
        questionService.getQuestionImprove(user_id)
            .then(
                question   =>  dispatch(success(question)),
                error   =>  dispatch(failure(error))
        )
    }
    function request(user_id) { return { type : questionConstants.SKIP_QUESTION_IMPROVE_REQUEST, user_id }}
    function success(question){ return { type: questionConstants.SKIP_QUESTION_IMPROVE_SUCCESS, question }}
    function failure(error) { return { type: questionConstants.SKIP_QUESTION_IMPROVE_FAILURE, error }}
}
function answerQuestion(answer, question_id, user_id){
    return dispatch=>{
        dispatch(request());
        questionService.answerQuestion(answer, question_id, user_id)
            .then(
                question    => dispatch(success(question)),
                error   => dispatch(failure(error))
        )
    }
    function request(){ return { type: questionConstants.ANSWER_QUESTION_REQUEST}};
    function success(question){ return { type: questionConstants.ANSWER_QUESTION_SUCCESS,question}};
    function failure(error){ return { type: questionConstants.ANSWER_QUESTION_FAILURE,error}};
}
function getAnsweredQuestion(user_id){
    return dispatch=>{
        dispatch(request(user_id));
        questionService.getAnsweredQuestion(user_id)
            .then(
                question    => dispatch(success(question)),
                error   => dispatch(failure(error))
        )
    }
    function request(user_id){ return { type: questionConstants.ANSWERED_QUESTION_REQUEST, user_id}};
    function success(question){ return { type: questionConstants.ANSWERED_QUESTION_SUCCESS, question}};
    function failure(error){ return { type: questionConstants.ANSWERED_QUESTION_FAILURE, error}};
}