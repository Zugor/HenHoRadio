module.exports={
    fields:{
        enabled             : "boolean",
        is_active           : "boolean",
        mobile_active       : "boolean",
        user_id             : "uuid",
        create_date         : "timestamp",
        preview_thumbnail   : "text",
        fullname            : "text",
        description         : "text",
        avg_ratings         : "int",
        dob_year            : "int",
        gender              : "int",
    },
    key:[["enabled","is_active","mobile_active"],"create_date","user_id"] ,
    clustering_order: {"create_date": "desc"},
}
