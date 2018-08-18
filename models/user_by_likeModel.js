module.exports={
    fields:{
        user_id             : "uuid",
        like_user_id        : "uuid",
        release_timestamp   : "timestamp",
        preview_thumbnail   : "text",
        fullname            : "text",
        dob_year            : "int",
        gender              : "int",
        description         : "text",
        address             : "text",
        image_count         : "int",
             
    },
    key:[["user_id"]] ,
}