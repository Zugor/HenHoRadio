module.exports={
    fields:{
        notification_id     : "uuid",
        readed              : "boolean",
        posted_timestamp    : "timestamp",
        title               : "text",
        type                : "text",
        description         : "text",
    },
    key:[["notification_id"],"posted_timestamp","readed"] ,
    clustering_order: {"posted_timestamp": "desc"}
}
