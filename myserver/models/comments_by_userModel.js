module.exports={
    fields:{
        user_id             : "uuid",
        comment_user_id     : "uuid",
        posted_timestamp    : "timestamp",
        comment             : "text",
        fullname            : "text",
        preview_thumbnail   : "text",
        dob_year            : "int",
        gender              : "int",
        description         : "text",
    },
    key:[["user_id"],"posted_timestamp","comment_user_id"] ,
    clustering_order: {"posted_timestamp": "desc"},
}