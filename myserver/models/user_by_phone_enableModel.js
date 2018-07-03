
module.exports={
    fields:{
        phone                       : "text", //unicode
        enabled                     : "boolean", //2bit
        user_id                     : "uuid",//128bit
        password                    : "text", 
        password_hash_algorithm     : "text",
        password_salt               : "text",
    },
    key:[["phone"],"enabled"]
}