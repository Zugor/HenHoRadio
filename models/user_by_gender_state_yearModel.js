module.exports={
    fields:{
        gender              : "int",
        state               : "int",
        dob_year            : "int",
        created_date        : "timestamp",
        user_id             : "uuid",
        preview_thumbnail   : "text",
        fullname            : "text",
        description         : "text",
    },
    key:[["gender","state"],"created_date","user_id","dob_year"] ,
    clustering_order: {"created_date": "desc"}
}
