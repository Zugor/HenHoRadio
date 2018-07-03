var express=require('express');

function router(router){
    router.get("/",function(req,res,next){
        res.send('HelloWorld');
    })
}
module.exports=router