module.exports={
    fields:{
        user_id             : "uuid",
        album_id            : "uuid",
        image_id            : "uuid",
        uploaded_timestamp  : "timestamp",
        description         : "text",
    },
    key:[["user_id","album_id"],"uploaded_timestamp","image_id"] ,
    clustering_order: {"uploaded_timestamp": "desc"}
}