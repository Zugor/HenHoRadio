module.exports={
    fields:{
        user_id             : "uuid",
        friend_user_id      : "uuid",
        release_timestamp   : "timestamp",
        preview_thumbnail   : "text",
        fullname            : "text",
        dob_year            : "int",
        gender              : "int",
        description         : "text",
    },
    key:[["user_id","friend_user_id"],"release_timestamp"] ,
    clustering_order: {"release_timestamp": "desc"}
}