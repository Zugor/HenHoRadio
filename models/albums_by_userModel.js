module.exports={
    fields:{
        user_id         : "uuid",
        album_id        : "uuid",
        title           : "uuid",
        created_time    : "timestamp",
        description     : "text",
    },
    key:[["user_id"],"title","album_id"] ,
    clustering_order: {"title": "desc"}
}