import questionConstants from "../constants";

export function question(state={},action){
    
    switch(action.type){
        case 'QUESTIONS_REQUEST':
            return{
                
            }
        case 'QUESTIONS_SUCCESS':
            //console.log(state);
            console.log(action);
            
            return {
               question: action.question
            };
        case 'QUESTIONS_FAILURE':
            //console.log(state);
            
            return {
                
         };
        default:
            return state;
    }
    
}