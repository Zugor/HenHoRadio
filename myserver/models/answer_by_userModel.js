module.exports={
    fields:{
        answer_id             : "uuid",
        user_id             : "uuid",
        time_create    : {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        },
        answer     : "int",
        answer_accepted     : {
            type: "list",
            typeDef: "<tinyint>"
        },
        importance : {
            type: "tinyint",
            default: 2
        },
        explanation : {
            type: "text",
            default: ""
        },
        private : {
            type: "tinyint",
            default: 0
        },
        question_id     : "uuid",
    },
    key:[["user_id"], "answer_id"] ,
}
