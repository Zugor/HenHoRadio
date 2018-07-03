module.exports={
    fields:{
        user_id             : "uuid",
        uploaded_timestamp  : "timestamp",
        album_id            : "uuid",
        image_id            : "uuid",
        face_active         : "boolean",
        publish             : "boolean",
        delete_timestamp    : "timestamp",
    },
    key:[["user_id"],"image_id"] ,
}