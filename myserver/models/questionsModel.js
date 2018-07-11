module.exports={
    fields:{
        question_id         : "uuid",
        question            : "text",
        category            : "text",
        answer              : {
            type: "list",
            typeDef: "<text>",
            default: ["có","không"]     
        },
    },
    key:[["question_id"]] ,
}
