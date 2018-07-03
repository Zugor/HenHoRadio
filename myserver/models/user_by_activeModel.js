module.exports={
    fields:{
        user_id             : "uuid",
        id_like             : "uuid",
        preview_thumbnail   : "uuid",
        enabled             : "boolean",
        is_active           : "boolean",
        mobile_active       : "boolean",
        liked               : "boolean",
        create_date         : "timestamp",
        fullname            : "text",
        description         : "text",
        avg_ratings         : "int",
        dob_year            : "int",
        gender              : "int",
        image_count         : "int",
        address             : "text"
    },
    key:[["user_id"]] ,
}
