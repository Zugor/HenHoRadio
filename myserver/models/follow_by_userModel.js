module.exports={
    fields:{
        user_id             : "uuid",
        follow_user_id      : "uuid",
        release_timestamp   : "timestamp",
        preview_thumbnail   : "text",
        fullname            : "text",
        dob_year            : "int",
        gender              : "int",
        description         : "text",
    },
    key:[["user_id","follow_user_id"],"release_timestamp"] ,
    clustering_order: {"release_timestamp": "desc"}
}
