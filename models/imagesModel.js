module.exports={
    fields:{
        image_id        : "uuid",
        image           : "blob",
        options         :
                        {   type        : "map",
                            typeDef     : "<text,text>" },
        description     : "text",
        face_active     : "boolean"
    },
    key:[["image_id"]] 
}