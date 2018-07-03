module.exports={
    fields:{
        user_id             : "uuid",
        like_user_id        : "uuid",
        id                  : "uuid",
        release_timestamp   : "timestamp",
        preview_thumbnail   : "text",
        fullname            : "text",
        dob_year            : "int",
        gender              : "int",
        description         : "text",
    },
    key:[["id"],"release_timestamp"] ,
    clustering_order: {"release_timestamp": "desc"}
}