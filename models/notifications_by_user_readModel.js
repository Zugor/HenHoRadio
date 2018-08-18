module.exports={
    fields:{
        user_id             : "uuid",
        readed              : "boolean",
        posted_timestamp    : "timestamp",
        notification_id     : "text",
        title               : "text",
        type_navigation     : "text",
        description         : "text",
    },
    key:[["user_id","readed"],"posted_timestamp","notification_id"] ,
    clustering_order: {"posted_timestamp": "desc"},
}
