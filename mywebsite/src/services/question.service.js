import { authHeader } from "../store";
export const questionService= {
    getQuestion,
    answerQuestion,
    skipQuestion,
}
const api={
    getQuestion           :"/question/get",
    skipQuestion          :"/question/get",
    answerQuestion    :"/question/answer",
}

function getQuestion(user_id){
    const requestOptions={
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({id: user_id})
    }
    return fetch(api.getQuestion,requestOptions).then(handleResponse);
}
function skipQuestion(user_id){
    const requestOptions={
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({id: user_id})
    }
    return fetch(api.skipQuestion,requestOptions).then(handleResponse);
}
function answerQuestion(answer, question_id, user_id){
    const requestOptions={
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({answer: answer, question_id: question_id, user_id: user_id})
    }
    return fetch(api.answerQuestion,requestOptions).then(handleResponse);
}

function handleResponse(response){
    if(!response.ok){
        return Promise.reject(response.statusText);
    }
    return response.json();
    
}