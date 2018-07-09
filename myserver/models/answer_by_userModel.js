module.exports={
    fields:{
        answer_id             : "uuid",
        user_id             : "uuid",
        time_create    : "timestamp",
        answer     : "text",
        question_id     : "uuid",
    },
    key:[["user_id"], "answer_id"] ,
}
