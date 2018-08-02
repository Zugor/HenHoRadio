module.exports={
    fields:{
        user_id             : "uuid",
        otp                 : "int",
        time_create         : {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        },
        phone               : "text",
        status              : {
            type: "boolean",
            default: false
        },
    },
    key:["user_id"]
}
