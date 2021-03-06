
const fs              = require('fs');
//const fr            = require('face-recognition');
//const cv              = require('opencv4nodejs')
//const fr              = require('face-recognition').withCv(cv)
const express         = require('express');
const async           = require("async");
const bcrypt          = require("bcryptjs");
const https           = require('https');
const path            = require('path');
const jsonParser	  = require('body-parser').json();
const multer          = require('multer');
const app             = module.exports=express();
const models          = require("./settings_db");
const Uuid            = require("cassandra-driver").types.Uuid;
const upload          = multer();
//const sharp           = require('sharp');

var privateKey  = fs.readFileSync('ssl_cert/hhr.key', 'utf8');
var certificate = fs.readFileSync('ssl_cert/hhr.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static('public'));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
//
    // Pass to next layer of middleware
    next();
});

const MESSAGE={
    USER_NOT_MATCH      : "Tài khoản hoặc mật khẩu không đúng",
    USER_NOT_FOUND      : "Tài khoản này không tồn tại!",
    USER_HAD_BANNED     : "Tài khoản đang bị khoá",
    SYSTEM_BUSY         : "Hệ thống bận!",
    PAYMENT_NOT_SEND_OTP: "Bạn chưa nhắn tin xác thực! Hãy nhắn tin tới tổng đài.",
    PAYMENT_OTP_OK      : "Xác thực thành công!",
    PAYMENT_OTP_WRONG   : "OTP không chính xác.",
};
app.post("/user/authenticate", jsonParser,function(req,res,next){
    var params=req.body;
    var PARAM_IS_VALID={};
    var user={};
    var hashPassword="";
    var isLogin=false;
    var msg="";
    async.series([
        function(callback){
            PARAM_IS_VALID["username"]=params.username;
            PARAM_IS_VALID["password"]=params.password;
            PARAM_IS_VALID["return_url"]=(params.return_url !=undefined && params.return_url!="") ?params.return_url : "/" ;
            user["username"]=params.username;
            callback(null,null);
        },
        function(callback){
            models.instance.user_by_phone_enable.find({ phone: PARAM_IS_VALID["username"] },function(err,_user){

                if(_user != undefined && _user.length > 0 ) {

                    (_user[0].enabled) ? hashPassword=_user[0].password : msg=MESSAGE.USER_HAD_BANNED;
                    user["user_id"]=_user[0].user_id;
                }else{
                    msg=MESSAGE.USER_NOT_FOUND;
                }
                callback(err,null);
            });
        },
        function(callback){
            if(hashPassword !=""){
                bcrypt.compare(PARAM_IS_VALID["password"], hashPassword, function(err, res) {
                    // res == true
                    isLogin=res;
                    (!res) ? msg=MESSAGE.USER_NOT_MATCH : "" ;
                    callback(err,null);
                });
            }else callback(null,null);
        },
        function(callback){
            if(isLogin){
                user["token"]="abc";
            }
            callback(null,null);
        }
    ],function(err,result){
        if(err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY, users: [] });
        else (msg !="") ?
            res.json({ status: false, message: msg, user : user,  })
        :
            res.json({ status: true, user : user, return_url: PARAM_IS_VALID["return_url"]  })
    })

});
app.post("/user/OAuth", jsonParser,function(req,res,next){
    var params=req.body;
    var PARAM_IS_VALID={};
    var user={};
    var isLogin=false;
    var msg="";
    async.series([
        function(callback){
            PARAM_IS_VALID["id"]=params.id;
            PARAM_IS_VALID["email"]=params.email;
            PARAM_IS_VALID["accessToken"]=params.data && params.data.accessToken ? params.data.accessToken : null;
            PARAM_IS_VALID["fullname"]=params.data && params.data.fullname ? params.data.fullname : null;
            PARAM_IS_VALID["picture"]=params.data && params.data.picture ? params.data.picture : null;
            PARAM_IS_VALID["by"]=params.data && params.data.by ? params.data.by : null;

            PARAM_IS_VALID["return_url"]=(params.return_url !=undefined && params.return_url!="") ?params.return_url : "/" ;
            user["username"]=params.email;
            callback(null,null);
        },
        function(callback){
            models.instance.user_by_3rd.find({ id: PARAM_IS_VALID.id, email: PARAM_IS_VALID.email },function(err,_user){

                if(_user != undefined && _user.length > 0 ) {
                    isLogin=res;
                    user["user_id"]=_user[0].user_id;
                }else{
                    msg=MESSAGE.USER_NOT_FOUND;
                }
                callback(err,null);
            });
        },
        function(callback){
            if(isLogin){
                user["token"]="abc";
            }
            callback(null,null);
        }
    ],function(err,result){
        if(err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY, users: [] });
        else (msg !="") ?
            res.json({ status: true, message: msg, user : PARAM_IS_VALID  })
        :
            res.json({ status: true, user : user, return_url: PARAM_IS_VALID["return_url"]  })
    })

});

app.get("/test",function(req,res,next){
    res.render('upload');
});
app.post("/user/registration", jsonParser,function(req,res,next){
    let user_id=Uuid.random();
    var params=req.body;
    var queries=[],msg=[];
    let saltRounds=10;
    var _salt="",_hash="";
    var PARAM_IS_VALID={},user={};
    async.series([
        function(callback){
            PARAM_IS_VALID["phone"]     = params.phone;
            PARAM_IS_VALID["fullname"]  = params.fullname;
            //PARAM_IS_VALID["state"]     = params.selectRegion;
            //PARAM_IS_VALID["stateVal"]  = Number(params.selectRegion.value);
            PARAM_IS_VALID["dob_day"]   = Number(params.dob_day);
            PARAM_IS_VALID["dob_month"] = Number(params.dob_month);
            PARAM_IS_VALID["dob_year"]  = Number(params.dob_year);
            PARAM_IS_VALID["gender"]    = Number(params.gender);
            PARAM_IS_VALID["email"]     = params.email;
            PARAM_IS_VALID["enabled"]   = true;
            PARAM_IS_VALID['address']   = params.address;
            PARAM_IS_VALID['hhr_goal']  = params.goal;
            PARAM_IS_VALID['user_id']   = user_id;
            user={
                user_id: PARAM_IS_VALID['user_id'],

            }
            callback(null,null);
        },
        function(callback){
            if(params.with3rd) {
                PARAM_IS_VALID["preview_thumbnail"]     = params.with3rd.picture?params.with3rd.picture:null;
                PARAM_IS_VALID["accessToken"]           = params.with3rd.accessToken?params.with3rd.accessToken:null;
                PARAM_IS_VALID["3rd_by"]                = params.with3rd.by?params.with3rd.by:null;
                PARAM_IS_VALID["3rd_id"]                = params.with3rd.id?params.with3rd.id:null;
            }
            callback(null,null);
        },
        function(callback){
            bcrypt.genSalt(saltRounds,  function(err,salt){
                _salt=salt
                callback(err,null);
            });
        },
        function(callback){
            bcrypt.hash(params.password, _salt,   function(err,hash){
                _hash=hash;
                callback(err,null);
            });
        },
        function(callback){
            var user_by_3rd_object={};
            if(params.with3rd) {
                user_by_3rd_object={
                    id                          : PARAM_IS_VALID["3rd_id"],
                    email                       : PARAM_IS_VALID.email,
                    user_id                     : PARAM_IS_VALID.user_id,
                    name                        : PARAM_IS_VALID.fullname,
                    picture                     : PARAM_IS_VALID.preview_thumbnail,
                    by                          : PARAM_IS_VALID["3rd_by"],
                }
            }
            var user_login_object={
                phone                   : PARAM_IS_VALID.phone,
                enabled                 : PARAM_IS_VALID.enabled,
                password                : _hash,
                password_hash_algorithm : "bcrypt",
                password_salt           :_salt,
                user_id                 : PARAM_IS_VALID.user_id,
            }
            var user_by_phone_object={
                phone                   : PARAM_IS_VALID.phone,
            }
            var user_object={
                user_id     : user_id,
                fullname    : PARAM_IS_VALID.fullname,
                gender      : PARAM_IS_VALID.gender,
                address     : PARAM_IS_VALID.address,
                phone       : PARAM_IS_VALID.phone,
                dob_day     : PARAM_IS_VALID.dob_day,
                dob_month   : PARAM_IS_VALID.dob_month,
                dob_year    : PARAM_IS_VALID.dob_year,
            }
            var user_by_enabled_active_mobile_active_object={
                enabled                 : true,
                is_active               : false,
                mobile_active           : false,
                create_date             : new Date().getTime(),
                user_id                 : user_id,
                dob_year                : PARAM_IS_VALID.dob_year,
                fullname                : PARAM_IS_VALID.fullname,
                gender                  : PARAM_IS_VALID.gender,

            }
            var user_by_gender_state_year_object={
                gender          : PARAM_IS_VALID.gender,
                //state           : PARAM_IS_VALID.address,
                preview_thumbnail: PARAM_IS_VALID.preview_thumbnail ?PARAM_IS_VALID.preview_thumbnail:null,
                dob_year        : PARAM_IS_VALID.dob_year,
                fullname        : PARAM_IS_VALID.fullname,
                created_date    : new Date().getTime(),
                user_id         : user_id,
            }

            if(params.with3rd) {
                const user_by_3rd=()=>{
                    let object      =user_by_3rd_object;
                    let instance    =new models.instance.user_by_3rd(object);
                    let save        =instance.save({if_exist: true, return_query: true});
                    return save;
                }
                queries.push(user_by_3rd());
            }
            const user_by_phone_enable=()=>{
                let object      =user_login_object;
                let instance    =new models.instance.user_by_phone_enable(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(user_by_phone_enable());
            const user_by_phone=()=>{
                let object      =user_by_phone_object;
                let instance    =new models.instance.user_by_phone(object);
                let save        =instance.save({return_query: true});
                return save;
            }
             queries.push(user_by_phone());
            // Save user detail
            const users=()=>{
                let object      =user_object;
                let instance    =new models.instance.Users(object);
                let save        =instance.save({return_query: true});
                return save;
            }

            queries.push(users());
            const user_by_details=()=>{
                let object      ={
                    user_id : user_id,
                    hhr_goal: PARAM_IS_VALID.hhr_goal,
                };
                if(params.with3rd) {
                    if(PARAM_IS_VALID['3rd_by'] === 'facebook')
                        object = {
                            ...object,
                            facebook: {
                                private: PARAM_IS_VALID['3rd_id'],
                                name: PARAM_IS_VALID.fullname,
                            }
                        }
                    else
                        object = {
                            ...object,
                            emails: {
                                googleId: PARAM_IS_VALID['3rd_id'],
                                private: PARAM_IS_VALID.email,
                            }
                        }
                }
                let instance    =new models.instance.user_by_details(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(user_by_details());
            /*
            // Save user_by_enabled_active_mobile_active_object
            const user_by_enabled_active_mobile_active=()=>{
                let object      =user_by_enabled_active_mobile_active_object;
                let instance    =new models.instance.user_by_enabled_active_mobile_active(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(user_by_enabled_active_mobile_active());
            */
            // Save user_by_gender_state_year
            const user_by_gender_state_year=()=>{
                let object      =user_by_gender_state_year_object;
                let instance    =new models.instance.user_by_gender_state_year(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            //queries.push(user_by_gender_state_year());

            callback(null,null);
            // Batch Query
        }
    ],function(err,result){
        if(err) throw err;
        if(err) res.json({status: false});
       // console.log(queries);
        models.doBatch(queries,function(err){
            if (err) throw err;
            user['token']='abc';
            user['username']=PARAM_IS_VALID.phone;
            //console.log(queries);
            if(err) res.json({status: false});
            else (msg.length > 0)?
                res.json({ status: false, message: msg, form: PARAM_IS_VALID})
            :
                res.json({ status: true, user: user});
        });

    })

});
app.get("/phone/:phone", jsonParser,function(req,res,next){
    let PARAMS_IS_VALID={};
    let params=req.params;
    models.instance.user_by_phone.find({phone: params.phone},function(err,result){
        if(err) res.json({status: false})
        else {
            if(result && result.length > 0){
                res.json({status: true})
            }else{
                res.json({status: false})
            }

        }
    })
});
app.get("/insert/active", jsonParser,function(req,res,next){
   var i=0;
    var year    =1985;
    var gender  =1;

    var interval=setInterval(function(){
        var uuid    =Uuid.random();
        var queries=[];
        if(i%1000==0){
            year=year+1;
        }
        if(i%2==0){
            gender=1;
        }else{
            gender=2;
        }
        var p={
            user_id     : uuid,
            create_date : new Date().getTime(),
            avg_ratings : 0,
            description : '',
            dob_year    : year,
            enabled     : true,
            fullname    : " Test Data "+i,
            gender      : gender,
            image_count : 0

        }
        const rand=(max,min)=>{ return (Math.floor(Math.random() * (max - min + 1)) + min) };
        var user={
            dob_year        :   year,
            dob_day         :   rand(30,1),
            dob_month       :   rand(12,1),
            fullname        :   " Test Data "+i,
            country         :   "Viet Nam",
            enabled         :   true,
            gender          :   gender,
            user_id         :   uuid,
        }
        var user=new models.instance.user_by_active(p);
        var us  =new models.instance.Users(user);
        queries.push(user.save({return_query:true}));
        queries.push(us.save({return_query:true}));

        models.doBatch(queries,function(err){
            console.log(err);
            console.log(i);
        });
        i++;
        if(i==20){
            clearInterval(interval);
        }
    },100);
    res.send("hello");
});
app.post("/user/member/active", jsonParser,function(req,res,next){
    var results =[];
    var n       =20;
    var total   =0;
    var params    =req.body;
    var VALID_PARAMS=[];
    async.series([
        function(callback){
            try{
                VALID_PARAMS['page']        = Number(params.page) > 0 ? Number(params.page) : 1 ;
                VALID_PARAMS['user_id']     = (params.user_id) ? models.uuidFromString(params.user_id) : null;

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            models.instance.user_by_active.eachRow({},{autoPage : true},function(n,users){
                results.push(users);
            },function(err,result){
                //console.log(err);
                callback(err,null);
            });

        },
        function(callback){
            let e =(results.length/n);
            let t =Math.floor(e);
            total = (e > t) ? t+1 : t;
            //console.log(results.length);
            if(total > 1){
                var start   = (VALID_PARAMS.page-1)*n;
                var end     = start+n;
                if(start >= results.length){
                    start=results.length-n;
                }
                if(end >= results.length ){
                    end     =results.length - 1;
                }
                results     =Object.values(results).slice(start,end);
            }
            callback(null,null);
        },
        function(callback){
            //query={...results};
            //console.log(results);
            var useridList=[];
            var useridListString=[];
            if(results.length > 0 && VALID_PARAMS.user_id){
                    results.map(user=>{
                    useridList.push(user.user_id);
                    useridListString.push(user.user_id.toString());
                });

                let query={
                    user_id         : VALID_PARAMS.user_id,
                    like_user_id    : { '$in' : useridList}
                }
                //console.log(query);
                models.instance.like_by_user.find(query,function(err,users){
                    if(users && users.length > 0){
                        users.map(user=>{
                            let index   = useridListString.indexOf(user.like_user_id.toString());
                            results[index].id_like   =user.id;
                            results[index].liked     =true;
                        });
                    }
                    callback(err,null);
                });
            }else{
                callback(null,null);
            }

        }

    ],function(err,result){
        if(err) res.json({status:false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true, users: results,total: total});
    });
});
app.get("/user/member/details/:id", jsonParser,function(req,res,next){
    let params          =req.params;
    let PARAMS_IS_VALID ={};
    let query           ={};
    let results         =[];
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['user_id'] = models.uuidFromString(params.id);
                query=PARAMS_IS_VALID;
                callback(null,null);
            }catch(e){
                //console.log(e);
                callback(e,null);
            }
        },
        function(callback){
            models.instance.user_by_details.find(query,function(err,user){
                //console.log(err,user);
                results=(user && user.length > 0 ) ? user : [];
                callback(err,null);
            })
        }
    ],function(err,result){
        if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY});
        else res.json({status: true,result: results});
    })
});
app.get("/user/register/member", jsonParser,function(req,res,next){
    var results=[];
    async.series([
        function(callback){
            models.instance.user_by_enabled_active_mobile_active.find({ enabled: true, is_active: false, mobile_active: false },{ limit: 10 , select :["avg_ratings","description","fullname","gender","dob_year","preview_thumbnail","user_id"]},function(err,users){

                results=(users && users.length > 0) ? users : [];
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){

        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , users: results });
    })
});
app.post("/api/search", jsonParser,function(req,res,next){
    var results=[];
    var params=req.body;
    var PARAM_IS_VALID={};
    var query={};
    async.series([
        function(callback){
            PARAM_IS_VALID['gender']        =Number(params.gender.value);
            PARAM_IS_VALID['seeking']       =Number(params.seeking.value);
            PARAM_IS_VALID['ageFrom']       =Number(params.ageFrom.value);
            PARAM_IS_VALID['ageTo']         =Number(params.ageTo.value);
            //PARAM_IS_VALID['state']         = (params.state) ?  Number(params.state.value) : '';

            let _year_start =new Date().getFullYear() - PARAM_IS_VALID['ageTo'];
            let _year_end   =new Date().getFullYear() - PARAM_IS_VALID['ageFrom'];
            query={
                gender: PARAM_IS_VALID['seeking'],
                dob_year: { '$gte':_year_start, '$lte':_year_end },
            }
            if(PARAM_IS_VALID['state'] && PARAM_IS_VALID['state'] !=''){
                query["state"]=PARAM_IS_VALID['state'];
            }
            callback(null,null);
        },
        function(callback){
            models.instance.user_by_gender_state_year.find(query,{allow_filtering: true},function(err,users){
                results=(users && users.length > 0) ? users : [];

                callback(err,null);
            })
        }
    ],function(err,result){
        if( err ) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true, users: results });
    })
});
app.get("/user/profile/:id", jsonParser,function(req,res,next){
    var results=[];
    var params=req.params;

    var PARAM_IS_VALID={};
    var query={};
    async.series([
        function(callback){
            try{
                PARAM_IS_VALID["user_id"]=models.uuidFromString(params.id);
                query={
                    user_id: PARAM_IS_VALID["user_id"],
                }
                callback(null,null);
            }catch(err){
                throw err ;
                callback(err,null);
            }
        },
        function(callback){
            models.instance.Users.find(query,function(err,result){
                results=(result && result.length > 0) ? result : [];
                //console.log(err,result,query);
                callback(err,null);
            });

        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
       if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY,user: []});
       else  res.json({status: true, user: results});
    });
});

app.get("/question/add/:category/:question", jsonParser,function(req,res,next){
    let question_id=Uuid.random();
    var {params}=req;
    //console.log(params);
    var question_object;
    var PARAM_IS_VALID={};
    var queries=[];msg=[];
    async.series([
        function(callback){
            question_object={
                question_id     : question_id,
                question        : params.question+'?',
                category        : params.category,
            }
            
            callback(null,null);
        },
        function(callback){
            const questions=()=>{
                let object      =question_object;
                let instance    =new models.instance.questions(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(questions());
            callback(null,null);
            // Batch Query
        }
    ],function(err,result){
        if(err) throw err;
        if(err) res.json({status: false});
       // console.log(queries);
        models.doBatch(queries,function(err){
            if (err) throw err;
            //console.log(queries);
            if(err) res.json({status: false});
            else (msg.length > 0)?
                res.json({ status: false, message: msg, form: PARAM_IS_VALID})
            :
                res.json({ status: true, result: question_object});
        });
    })
});
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

app.post("/question/get", jsonParser,function(req,res,next){
    let params=req.body;
    var uuid="";
    var PARAMS_IS_VALID={};
    var results={};
    var query={};
    var countAnswered = 0;
    async.series([
        function(callback){
            models.instance.questions.find({},function(err,questions){
                results=(questions && questions.length > 0) ? questions[randomInt(0,questions.length)] : null;
                callback(err,null);
            })
        },
        function(callback){
            try{
                uuid=models.uuidFromString(params.id);
                PARAMS_IS_VALID["uuid"]=uuid;
                query={
                    user_id: uuid,
                }
                callback(null,null)
            }catch(e){
                callback(e);
            }
        },
        function(callback){
            models.instance.answer_by_user.find(query,function(err, answers){
                if(answers) countAnswered = answers.length;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){

        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , countAnsweredQuestionsForQABox: countAnswered,randomYesNoQuestion: results });
    })
});
app.post("/question/improve/get", jsonParser,function(req,res,next){
    let params=req.body;
    var uuid="";
    var PARAMS_IS_VALID={};
    var results={};
    var query={};
    async.series([
        function(callback){
            try{
                uuid=models.uuidFromString(params.id);
                PARAMS_IS_VALID["uuid"]=uuid;
                query={
                    user_id: uuid,
                }
                callback(null,null)
            }catch(e){
                callback(e);
            }
        },
        function(callback){
            models.instance.questions.find({},function(err,questions){
                results=(questions && questions.length > 0) ? questions[randomInt(0,questions.length)] : null;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){

        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , randomQuestion: results });
    })
});
app.post("/question/improve/answer", jsonParser,function(req,res,next){
    let answer_id=Uuid.random();
    let params=req.body;
    var PARAMS_IS_VALID={};
    var results={};
    var queries=[];
    var question_object={};
    async.series([
        function(callback){
            PARAMS_IS_VALID["answer_id"]       = answer_id;
            PARAMS_IS_VALID["user_id"]         = (params.user_id) ? models.uuidFromString(params.user_id) : null;
            PARAMS_IS_VALID["question_id"]     = (params.question_id) ? models.uuidFromString(params.question_id) : null;
            PARAMS_IS_VALID["answer"]          = (params.answer) ? Number(params.answer) : 0 ;
            PARAMS_IS_VALID["answer_accepted"] = (params.answer_accepted) ? params.answer_accepted : [0,0];

            PARAMS_IS_VALID["answer_accepted"][PARAMS_IS_VALID.answer] = 1;
            if(params.explanation) PARAMS_IS_VALID["explanation"]      = params.explanation;
            if(params.importance)  PARAMS_IS_VALID["importance"]       = params.importanc;
            if(params.private)     PARAMS_IS_VALID["private"]          = params.private;
            callback(null,null);
        },
        function(callback){
            models.instance.questions.find({question_id: PARAMS_IS_VALID["question_id"]},function(err,question){
                question_object=(question && question.length > 0) ? question[0] : {question_id: PARAMS_IS_VALID["question_id"]};
                callback(err,null);
            })
        },
        function(callback){
            const answer=()=>{
                let object      ={...PARAMS_IS_VALID, ...question_object};
                let instance    =new models.instance.answer_by_user(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(answer());
            models.doBatch(queries,function(err){
                callback(err,null);
            });
            // Batch Query
        },
        function(callback){
            models.instance.questions.find({},function(err,questions){
                results=(questions && questions.length > 0) ? questions[randomInt(0,questions.length)] : null;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , randomQuestion: results });
    })
});
app.post("/question/answered/get", jsonParser,function(req,res,next){
    let params=req.body;
    var uuid="";
    var PARAMS_IS_VALID={};
    var results={};
    var query={};
    var countAnswered = 0;
    async.series([
        function(callback){
            try{
                uuid=models.uuidFromString(params.id);
                PARAMS_IS_VALID["uuid"]=uuid;
                query={
                    user_id: uuid,
                }
                callback(null,null)
            }catch(e){
                callback(e);
            }
        },
        function(callback){
            models.instance.answer_by_user.find(query,function(err, answers){
                if(answers) countAnswered = answers.length;
                results = answers;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){

        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , countAnsweredQuestionsForQABox: countAnswered, answeredQuestions: results });
    })
});
app.post("/question/answer", jsonParser,function(req,res,next){
    let answer_id=Uuid.random();
    let params=req.body;
    var PARAMS_IS_VALID={};
    var results={};
    var queries=[];
    var query={};
    var question_object={};
    var countAnswered = 0;
    async.series([
        function(callback){
            PARAMS_IS_VALID["answer_id"]       = answer_id;
            PARAMS_IS_VALID["user_id"]         = (params.user_id) ? models.uuidFromString(params.user_id) : null;
            PARAMS_IS_VALID["question_id"]     = (params.question_id) ? models.uuidFromString(params.question_id) : null;
            PARAMS_IS_VALID["answer"]          = (params.answer) ? Number(params.answer) : 0 ;
            PARAMS_IS_VALID["answer_accepted"] = (params.answer_accepted) ? params.answer_accepted : [0,0];

            PARAMS_IS_VALID["answer_accepted"][PARAMS_IS_VALID.answer] = 1;
            if(params.explanation) PARAMS_IS_VALID["explanation"]      = params.explanation;
            if(params.importance)  PARAMS_IS_VALID["importance"]       = params.importanc;
            if(params.private)     PARAMS_IS_VALID["private"]          = params.private;
            callback(null,null);
        },
        function(callback){
            models.instance.questions.find({question_id: PARAMS_IS_VALID["question_id"]},function(err,question){
                question_object=(question && question.length > 0) ? question[0] : {question_id: PARAMS_IS_VALID["question_id"]};
                callback(err,null);
            })
        },
        function(callback){
            const answer=()=>{
                let object      ={...PARAMS_IS_VALID, ...question_object};
                let instance    =new models.instance.answer_by_user(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(answer());
            models.doBatch(queries,function(err){
                callback(err,null);
            });
            // Batch Query
        },
        function(callback){
            models.instance.questions.find({},{select:['question_id','question']},function(err,questions){
                results=(questions && questions.length > 0) ? questions[randomInt(0,questions.length)] : null;
                callback(err,null);
            })
        },
        function(callback){
            query={
                user_id: PARAMS_IS_VALID.user_id,
            }
            models.instance.answer_by_user.find(query,{select:['user_id']},function(err, answers){
                if(answers) countAnswered = answers.length;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , countAnsweredQuestionsForQABox: countAnswered,randomYesNoQuestion: results });
    })
});
app.post("/question/answered/update", jsonParser,function(req,res,next){
    let params=req.body;
    var PARAMS_IS_VALID={};
    var results={};
    var query={};
    var countAnswered = 0;
    async.series([
        function(callback){
            PARAMS_IS_VALID["answer_id"]       = (params.answer_id) ? models.uuidFromString(params.answer_id) : null;
            PARAMS_IS_VALID["user_id"]         = (params.user_id) ? models.uuidFromString(params.user_id) : null;
            if(params.answer) PARAMS_IS_VALID["answer"]                = Number(params.answer);
            if(params.answer_accepted) PARAMS_IS_VALID["answer_accepted"] = (params.answer_accepted) ? params.answer_accepted : [0,0];
            if(params.answer_accepted) PARAMS_IS_VALID["answer_accepted"][PARAMS_IS_VALID.answer] = 1;
            
            if(params.explanation) PARAMS_IS_VALID["explanation"]      = params.explanation;
            if(params.importance)  PARAMS_IS_VALID["importance"]       = Number(params.importance);
            if(params.private)     PARAMS_IS_VALID["private"]          = Number(params.private);

            callback(null,null);
        },
        function(callback){
            query={
                user_id: PARAMS_IS_VALID.user_id,
            }
            var query_object = {user_id: PARAMS_IS_VALID.user_id, answer_id: PARAMS_IS_VALID.answer_id};
            var update_values_object = PARAMS_IS_VALID;
            var options = {ttl: 86400, if_exists: false};
            delete update_values_object.user_id;
            delete update_values_object.answer_id;

            models.instance.answer_by_user.update(query_object, update_values_object, options,function(err){
                callback(err,null);
            })
        },
        function(callback){
            models.instance.answer_by_user.find(query,function(err, answers){
                if(answers) countAnswered = answers.length;
                results = answers;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , countAnsweredQuestionsForQABox: countAnswered, answeredQuestions: results });
    })
});
app.post("/question/answered/delete", jsonParser,function(req,res,next){
    let params=req.body;
    var PARAMS_IS_VALID={};
    var results={};
    var query={};
    var countAnswered = 0;
    async.series([
        function(callback){
            PARAMS_IS_VALID["answer_id"]       = (params.answer_id) ? models.uuidFromString(params.answer_id) : null;
            PARAMS_IS_VALID["user_id"]         = (params.user_id) ? models.uuidFromString(params.user_id) : null;

            callback(null,null);
        },
        function(callback){
            var query_object = {user_id: PARAMS_IS_VALID.user_id, answer_id: PARAMS_IS_VALID.answer_id};
            var options = {ttl: 86400, if_exists: false};
            models.instance.answer_by_user.delete(query_object, options,function(err){
                console.log(err);
                
                callback(err,null);
            })
        },
        function(callback){
            query={
                user_id: PARAMS_IS_VALID.user_id,
            }
            models.instance.answer_by_user.find(query,function(err, answers){
                if(answers) countAnswered = answers.length;
                results = answers;
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , countAnsweredQuestionsForQABox: countAnswered, answeredQuestions: results });
    })
});

app.put("/api/update/detail", jsonParser,function(req,res,next){
    var PARAMS_IS_VALID ={};
    let params          =req.body;
    var query           ={};
    async.series([
        function(callback){

            try{
                console.log(params);

                PARAMS_IS_VALID["user_id"]  =models.uuidFromString(params.user_id);
                PARAMS_IS_VALID["field"]    =params.field;
                PARAMS_IS_VALID["value"]    =(params.field == 'home_town_return') ? Number(params.value) : params.value;
            }catch(e){
                //console.log(e);
                callback(e,null);
            }
            callback(null,null);
        },
        function(callback){
            var query_object = {user_id: PARAMS_IS_VALID.user_id};
            var update_values_object = {[PARAMS_IS_VALID.field]:PARAMS_IS_VALID.value };
            var options = {ttl: 86400, if_exists: false};
            models.instance.user_by_details.update(query_object, update_values_object, options, function(err){
                //    console.log(update_values_object);
                //     console.log(err);
                callback(err,null);
            });

        }

    ],function(err,result){
        if (err) res.json({status: false , message: MESSAGE.SYSTEM_BUSY});
        else res.json({status: true, results: params});
    });
});
app.put("/user/update", jsonParser,function(req,res,next){
    var PARAMS_IS_VALID = {};
    var params          = req.body;
    var queries         =[];
    var query           ={};
    var users_col       =['fullname'];
    var user_by_active_col=['description','fullname'];
    var user_by_details_col=['description'];
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['user_id']  = models.uuidFromString(params.user_id);
                PARAMS_IS_VALID['field']    = params.field;
                PARAMS_IS_VALID['value']    = params.value;
                callback(null,null);
            }catch(e){
                console.log(e)
                callback(e,null);
            }
        },
        function(callback){
            if(users_col.indexOf(PARAMS_IS_VALID['field']) > -1){
                const users=()=>{
                var query_object = {user_id: PARAMS_IS_VALID.user_id};
                var update_values_object = {[PARAMS_IS_VALID.field]:PARAMS_IS_VALID.value };
                var options = {ttl: 86400, if_exists: false};
                var instance = models.instance.Users.update(query_object, update_values_object, { return_query: true,if_exists: false});
                return instance;
            }
            queries.push(users());
            }

            if(user_by_active_col.indexOf(PARAMS_IS_VALID['field']) > -1){
                const user_by_active=()=>{
                    var query_object = {user_id: PARAMS_IS_VALID.user_id};
                    var update_values_object = {[PARAMS_IS_VALID.field]:PARAMS_IS_VALID.value };
                    var options = {ttl: 86400, if_exists: false};
                    var instance = models.instance.user_by_active.update(query_object, update_values_object, {if_exists: false , return_query: true});
                    return instance;
                }
                queries.push(user_by_active());
            }
            if(user_by_details_col.indexOf(PARAMS_IS_VALID['field']) > -1){
                const user_by_details=()=>{
                    var query_object = {user_id: PARAMS_IS_VALID.user_id};
                    var update_values_object = {[PARAMS_IS_VALID.field]:PARAMS_IS_VALID.value };
                    var options = {ttl: 86400, if_exists: false};
                    var instance = models.instance.user_by_details.update(query_object, update_values_object, {if_exists: false , return_query: true});
                    return instance;
                }
                queries.push(user_by_details());
            }
            callback(null,null);
        }
    ],function(err,result){
        if(err) res.json({status: false , message: MESSAGE.SYSTEM_BUSY});
        else{
            models.doBatch(queries,function(err){
                console.log(err);
                if (err) res.json({ status: false, message: MESSAGE.SYSTEM_BUSY });
                else res.json({status: true,result : params});
            })
        }
    });
});
app.get("/user/update/password/:id", jsonParser,function(req,res,next){
   res.send(" user update password ");
});
app.get("/images/:id", jsonParser,function(req,res,next){
    let params=req.params;
    var uuid="";
    var results=[];
    async.series([
        function(callback){
            try{
                uuid=models.uuidFromString(params.id);
                callback(null,null);
            }catch(e){
                callback(e,null);
            }
        },
        function(callback){
            models.instance.image_by_user.find({user_id: uuid},{select:["image_id","uploaded_timestamp","album_id","publish","face_active"]},function(err,images){
                results=(images!=undefined && images.length > 0) ?
                    images : []
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }],function(err,result){
            if(err) res.json({status: false,message:MESSAGE.SYSTEM_BUSY, images: []})
            else res.json({status: true,images: results});
        });
});
app.get("/image/:image_id", jsonParser,function(req,res,next){
    const { params } =req;
    var PARAMS_IS_VALID={};
    var query="";
    var image=null;
    var noImage = fs.readFileSync('./no-image.webp');
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID["image_id"]         = models.uuidFromString(params.image_id);
                query={image_id: PARAMS_IS_VALID.image_id};
                callback(null,null);
            }catch(e){
                callback(e,null);
            }
        },
        function(callback){
            models.instance.images.find(query,function(err,rows){
                if(rows!=undefined && rows.length > 0){
                    image=rows[0];
                }
                callback(err,null);
            });

        }
        ],function(err,result){
        if(err){
            res.contentType('image/jpeg');
            res.end(noImage,'binary');
        }else if(image!=null){
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(image.image,'binary');
        }else{
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(noImage,'binary');
        }
    });

});
app.put("/user/update/previewThumbnail", jsonParser,function(req,res,next){
    var PARAMS_IS_VALID={};
    var params=req.params;
    var queries=[];
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['user_id'] = models.uuidFromString(params.user_id);
                PARAMS_IS_VALID['image_id'] = models.uuidFromString(params.image_id);
                callback(null,null);
            }catch(e){
                callback(e,null);
            }


        },
        function(callback){
            const users=()=>{
                let query_object={preview_thumbnail: PARAMS_IS_VALID.image_id.toString()};
                let update_values_object={
                                            user_id : PARAMS_IS_VALID.user_id

                                         };
                let options={if_exists: true,return_query: true};
               return models.instance.Users.update(update_values_object,query_object,options)
            }
            queries.push(users())
            const user_by_active=()=>{
                let query_object={preview_thumbnail: PARAMS_IS_VALID.image_id.toString()};
                let update_values_object={
                                            user_id : PARAMS_IS_VALID.user_id
                                         };
                let options={if_exists: true,return_query: true};
               return models.instance.user_by_active.update(update_values_object,query_object,options)
            }
            queries.push(user_by_active())
            callback(null,null);
        },
    ],function(req,res,next){
         if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY});
         else {
                models.doBatch(queries,function(err){
                    //console.log(err);
                    if(err) ({status: false,message: MESSAGE.SYSTEM_BUSY});
                    else res.json({status: true,result: params})
                })
        }
    })
});
app.get("/image/t/:image_id",function(req,res,next){
    //console.log(data);
    const { params } =req;
    var PARAMS_IS_VALID={};
    var query="";
    var image=null;
    var newImage=null;
    var noImage = fs.readFileSync('./no-image.webp');
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID["image_id"]         = models.uuidFromString(params.image_id);
                query={image_id: PARAMS_IS_VALID.image_id};
                callback(null,null);
            }catch(e){
                callback(e,null);
            }
        },
        function(callback){
            models.instance.images.find(query,function(err,rows){
                if(rows!=undefined && rows.length > 0){
                    image=rows[0];
                }
                callback(err,null);
            });

        },
        ],function(err,result){
        if(err){
            res.contentType('image/jpeg');
            res.end(noImage,'binary');
        }else if(image!=null){
            res.writeHead(200, {'Content-Type': 'image/jpg'});

            res.end(image.image,'binary');
            /*
            sharp(image.image)
                .resize(180, 180)
                .toBuffer()
                .then(data=>{
                //console.log('update');
                 res.end(data,'binary');
             }).catch(e=>{
                 res.end(noImage,'binary');
             });
             **/
        }else{
            res.contentType('image/jpeg');
            res.end(noImage,'binary');
        }
    });
});
app.get("/image/preivew/:image_id",function(req,res,next){
    const { params } =req;
    var PARAMS_IS_VALID={};
    var query="";
    var image=null;
    var newImage=null;
    var noImage = fs.readFileSync('./no-image.webp');
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID["image_id"]         = models.uuidFromString(params.image_id);
                query={image_id: PARAMS_IS_VALID.image_id};
                callback(null,null);
            }catch(e){
                callback(e,null);
            }
        },
        function(callback){
            models.instance.images.find(query,function(err,rows){
                if(rows!=undefined && rows.length > 0){
                    image=rows[0];
                }
                callback(err,null);
            });

        },
        ],function(err,result){
        if(err){
            res.contentType('image/jpeg');
            res.end(noImage,'binary');
        }else if(image!=null){
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            //res.end(image.image,'binary');
            /*
            sharp(image.image)
                .resize(215, 215)
                .toBuffer()
                .then(data=>{
                 res.end(data,'binary');
             }).catch(e=>{
                 res.end(noImage,'binary');
             });
             */
        }else{
            res.contentType('image/jpeg');
            res.end(noImage,'binary');
        }
    });
});

app.put("/user/update/image", jsonParser,function(req,res,next){
    var PARAMS_IS_VALID={};
    var params=req.body;
    var queries=[];
    async.series([
        function(callback){
            try{
                //console.log(params);
                PARAMS_IS_VALID['user_id']  = models.uuidFromString(params.user_id);
                PARAMS_IS_VALID['image_id'] = models.uuidFromString(params.image_id);
                PARAMS_IS_VALID['publish']  = params.publish;
                callback(null,null);
            }catch(e){
                console.log(e);
                //callback(e,null);
            }
        },
        function(callback){
            const image_by_user=()=>{
                let query_object={publish: PARAMS_IS_VALID.publish};
                let update_values_object={
                                            user_id : PARAMS_IS_VALID.user_id,
                                            image_id: PARAMS_IS_VALID.image_id
                                         };
                let options={if_exists: true,return_query: true};
               return models.instance.image_by_user.update(update_values_object,query_object,options)
            }
            queries.push(image_by_user());

            callback(null,null);
        }
    ],function(err,result){
        //console.log(err);
        if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY});
        else {
            models.doBatch(queries,function(err){
                //console.log(err);
                if(err) ({status: false,message: MESSAGE.SYSTEM_BUSY});
                else res.json({status: true,result: params})
            })
        }
    })
});
app.post("/test",upload.single('formFile'),(req,res)=>{
    let formData = req.file;

    res.sendStatus(200);
});
app.post("/user/image/upload",upload.single('file'),(req,res,next)=>{
   let params   =req.body;
   let file     =req.file;
   var PARAMS_IS_VALID={};
   var queries=[];
   var result=false;
    var data_return={};
   async.series([
       function(callback){

           try{

               let image=file.buffer;
               let options={
                   filename : file.originalname,
                   size     : file.size+"",
                   encoding : file.encoding,
                   mimetype : file.mimetype,
               };
               PARAMS_IS_VALID['user_id']               = models.uuidFromString(params.user_id);
               PARAMS_IS_VALID['uploaded_timestamp']    = new Date().getTime();
               PARAMS_IS_VALID['image_id']              = Uuid.random();
               PARAMS_IS_VALID['image']                 = image;
               PARAMS_IS_VALID['description']           = (params.description!=undefined) ? params.description : "";
               PARAMS_IS_VALID['options']               = options;
               PARAMS_IS_VALID['fileIndex']             = params.fileIndex ? params.fileIndex : 0;
               PARAMS_IS_VALID['face_active']           = false;
               PARAMS_IS_VALID['publish']               = true;
               PARAMS_IS_VALID['type']                  = params.type;
               data_return={
                   image_id             : PARAMS_IS_VALID['image_id'],
                   uploaded_timestamp   : PARAMS_IS_VALID['uploaded_timestamp'],
                   publish              : PARAMS_IS_VALID['publish'],
                   face_active          : PARAMS_IS_VALID['face_active'],
                   album_id             : null,
                   type                 : PARAMS_IS_VALID['type']

               }
               callback(null,null);
           }catch(e){
              // console.log(e);
               callback(e,null);
           }

       },
       function(callback){
         /*
            let imageCvMat = cv.imdecode(PARAMS_IS_VALID['image'])
            let imageCv = fr.CvImage(imageCvMat)
            let imageRgb = fr.cvImageToImageRGB(imageCv)
            let detector = fr.FaceDetector()
            let targetSize = 150
            let faceImages = detector.detectFaces(imageRgb, targetSize)
            //console.log(image);
            //faceImages.forEach((img, i) => fr.saveImage(`face_${i}.png`,img));
            if(faceImages.length > 0){
                //console.log(faceImages[0].toString('base64'));
                PARAMS_IS_VALID['face_active']=true;
                data_return['face_active']=true;

            }
           */
            callback(null,null);
       },
       function(callback){
           var image_object={
               image_id             : PARAMS_IS_VALID.image_id,
               description          : PARAMS_IS_VALID.description,
               image                : PARAMS_IS_VALID.image,
               options              : PARAMS_IS_VALID.options,
               face_active          : PARAMS_IS_VALID.face_active,
           }

            let object   =image_object;
            let instance =new models.instance.images(object);
            let save     =instance.save({if_exist: true},(err)=>{
                   callback(err,null);
            });
       },
       function(callback){
           var image_by_user_object={
                face_active          : PARAMS_IS_VALID.face_active,
                user_id              : PARAMS_IS_VALID.user_id,
                uploaded_timestamp   : PARAMS_IS_VALID.uploaded_timestamp,
                image_id             : PARAMS_IS_VALID.image_id,
           }
           const image_by_user=()=>{
               let object   =image_by_user_object;
               let instance =new models.instance.image_by_user(object);
               let save     =instance.save({return_query: true});
               return save;
           }
           queries.push(image_by_user());

           callback(null,null);
       },
       function(callback){
           if(PARAMS_IS_VALID.type=='previewThumbnail' && PARAMS_IS_VALID['face_active']){
            const users=()=>{
                let query_object={preview_thumbnail: PARAMS_IS_VALID.image_id};
                let update_values_object={
                                            user_id : PARAMS_IS_VALID.user_id

                                         };
                let options={if_exists: true};
               return models.instance.Users.update(update_values_object,query_object,options)
            }
            users();
            //queries.push(users())
            const user_by_active=()=>{
                let query_object={preview_thumbnail: PARAMS_IS_VALID.image_id};
                let update_values_object={
                                            user_id : PARAMS_IS_VALID.user_id
                                         };
                let options={if_exists: true};
               return models.instance.user_by_active.update(update_values_object,query_object,options)
            }
            user_by_active();
            }
            callback(null,null)
       }

   ],function(err,result){
       if (err) throw err;
        if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY,result: {},fileIndex:PARAMS_IS_VALID['fileIndex']});
        else {
            //console.log(queries);
            models.doBatch(queries,function(err){
                if (err) throw err;
                if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY,result: {},fileIndex: PARAMS_IS_VALID['fileIndex']})
                else res.json({status: true,result: data_return,fileIndex: PARAMS_IS_VALID['fileIndex']})
            })
        }
   });
});
app.get("/user/albums/:id", jsonParser,function(req,res,next){
    let params=req.params;
    var uuid="";
    var results=[];
    var PARAMS_IS_VALID={};
    var query={}
    async.series([
        function(callback){
            try{
                uuid=models.uuidFromString(params.id);
                PARAMS_IS_VALID["uuid"]=uuid;
                query={
                    user_id: uuid,
                }
                callback(null,null)
            }catch(e){
                callback(e);
            }
        },
        function(callback){
            models.instance.albums_by_user.find(query,function(err,albums){
               results=(albums !=undefined && albums.length > 0) ? album : [];
                callback(err,null);
            });
        }
    ],function(err,result){
        if(err) res.json({status: false, message:MESSAGE.SYSTEM_BUSY,albums: []});
        else res.json({status: true, albums: results});

    });
});
app.post("/user/match/like", jsonParser,function(req,res,next){
   let params=req.body;
    var PARAMS_IS_VALID={};
    var object      ={};
    var results     =[];
    var queries     =[];
    var msg         =[];
    async.series([

        function(callback){
            try{
                PARAMS_IS_VALID["id"]               =Uuid.random();
                PARAMS_IS_VALID["user_id"]          =models.uuidFromString(params.uuid);
                PARAMS_IS_VALID["like_user_id"]     =models.uuidFromString(params.user_id);
                PARAMS_IS_VALID["release_timestamp"]=new Date().getTime();
                PARAMS_IS_VALID["description"]      =params.description;
                PARAMS_IS_VALID["dob_year"]         =Number(params.dob_year);
                PARAMS_IS_VALID["fullname"]         =params.fullname;
                PARAMS_IS_VALID["gender"]           =Number(params.gender);
                PARAMS_IS_VALID["preview_thumbnail"]=params.preview_thumbnail;

                callback(null,null);
            }catch(e){
                //console.log(e);
                callback(e,null);
            }
        },
        function(callback){
            const  like_by_user=()=>{
                let object  ={
                    user_id         : PARAMS_IS_VALID.user_id,
                    like_user_id    : PARAMS_IS_VALID.like_user_id,
                    id              : PARAMS_IS_VALID.id
                    }
                let like_by_user=new models.instance.like_by_user(object);
                return like_by_user.save({return_query: true});
            }
            queries.push(like_by_user());
            const likes=()=>{
                let object  =PARAMS_IS_VALID;
                let like    =new models.instance.likes(object);
                return like.save({return_query: true});
            }
            queries.push(likes());
            callback(null,null);

        }
    ],function(err,result){

        if(err) res.json({status: false, message:MESSAGE.SYSTEM_BUSY,result: []});
        else {
            models.doBatch(queries,function(err){

                if(err) res.json({status: false});
                else {
                    params["liked"]     =true;
                    params["id_like"]        =PARAMS_IS_VALID.id;
                    delete params.uuid;
                if  (msg.length > 0){
                    res.json({ status: false, message: msg})
                }else{
                    res.json({ status: true,result: [params] });
                }
                }
            });
        }
    });
});
app.get("/user/match/like/:id", jsonParser,function(req,res,next){
   let params=req.params;
    var PARAMS_IS_VALID={};
   var query={};

   async.series([
       function(callback){
           try{
               PARAMS_IS_VALID["user_id"]=models.uuidFromString(params.id);
               query=PARAMS_IS_VALID;
               callback(null,null);
           }catch(e){
               callback(e,null);
           }
       },
       function(callback){
           models.instance.like_by_user.find(query,{select :["id"]},function(err,users){
               results=(users !=undefined && users.length > 0) ? users : [];
               callback(err,null);
           });
       },
       function(callback){
            if(results.length > 0){
                let _in=[];
                results.map(item=>{
                    _in.push(item.id)
                })
                var qu={
                    user_id:PARAMS_IS_VALID.user_id,
                    id:{'$in':_in} 
                }
                
                models.instance.likes.find(qu,function(err,users){
                    results=(users !=undefined && users.length > 0) ? users : [];
                    callback(err,users);
                });
            }else{
                callback(null,null);
            }
            
        }
    ],function(err,result){
       if(err) res.json({status: false, message:MESSAGE.SYSTEM_BUSY,result: []});
        else res.json({ status: true,result: results });
   })
});
app.get("/user/match/like/f/:like_id/:uuid", jsonParser,function(req,res,next){
    var PARAMS_IS_VALID={};
    const params    =req.params;
    var results      =[];
    var query       ={};
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID["user_id"]  =models.uuidFromString(params.uuid);
                PARAMS_IS_VALID["like_user_id"]  =models.uuidFromString(params.like_id);
                query=PARAMS_IS_VALID;
                callback(null,null);
            }catch(e){
                callback(e,null);
            }
        },
        function(callback){
            models.instance.like_by_user.find(query,function(err,user){
                results=(user && user.length > 0) ? user : [];
                callback(err,null);
            });
        }
    ],function(err,result){
        if(err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({status: true,result: results});
    })
});
app.get("/user/match/like/a/:id",function(req,res,next){
    let params=req.params;
   var PARAMS_IS_VALID={};
   var query={};

   async.series([
       function(callback){
           try{
               PARAMS_IS_VALID["user_id"]=models.uuidFromString(params.id);
               query=PARAMS_IS_VALID;
               callback(null,null);
           }catch(e){
               callback(e,null);
           }
       },
       function(callback){
           models.instance.user_by_like.find(query,function(err,users){
               results=(users !=undefined && users.length > 0) ? users : [];
               callback(err,null);
           });
       },
   ],function(err,result){
       if(err) res.json({status: false, message:MESSAGE.SYSTEM_BUSY,result: []});
        else res.json({ status: true,result: results });
   })
});
app.delete("/user/match/like/:id/:like_id/:uuid", jsonParser,function(req,res,next){
   let params=req.params;
   var PARAMS_IS_VALID={};
   var queries=[];
   var results=false;
   async.series([
       function(callback){
           try{
                //console.log(params);
                PARAMS_IS_VALID['id']            =models.uuidFromString(params.id);
                PARAMS_IS_VALID['user_id']       =models.uuidFromString(params.uuid);
                PARAMS_IS_VALID['like_user_id']  =models.uuidFromString(params.like_id);
                query=PARAMS_IS_VALID;
                callback(null,null);
           }catch(e){
               callback(e,null);
           }
       },
       function(callback){
           const like_by_user=()=>{
               let query={  user_id         : PARAMS_IS_VALID.user_id,
                            like_user_id    : PARAMS_IS_VALID.like_user_id
                         }
               return models.instance.like_by_user.delete(query,{return_query:true})
           }
           queries.push(like_by_user());
           const like=()=>{
               let query={
                   id: PARAMS_IS_VALID.id
               }
               return models.instance.likes.delete(query,{return_query: true});
           }
           queries.push(like());
           callback(null,null);
       }
   ],function(err,result){
       if(err) throw err;
       if(err) res.json({status: false, message:MESSAGE.SYSTEM_BUSY,result: false});
        else {
            models.doBatch(queries,function(err){
                if(!err) res.json({ status: true,result: [params] });
                else{
                    res.json({ status: false,result: [params] });
                }
            });
        }
   })
});
app.post("/user/delete/image", jsonParser,function(req,res,next){
    var PARAMS_IS_VALID={};
    var params=req.body;
    var queries=[];
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['user_id']= models.uuidFromString(params.user_id);
                PARAMS_IS_VALID['image_id']= models.uuidFromString(params.image_id);
                PARAMS_IS_VALID['uploaded_timestamp']=null,
                PARAMS_IS_VALID['delete_timestamp'] = new Date(),
                PARAMS_IS_VALID['album_id'] = params.album_id,
                PARAMS_IS_VALID['publish'] = params.publish,
                PARAMS_IS_VALID['face_active'] = params.face_active,

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            const image_by_user=()=>{
                let query={  user_id    : PARAMS_IS_VALID.user_id,
                            image_id    : PARAMS_IS_VALID.image_id,
                         }
                return models.instance.image_by_user.delete(query,{return_query:true})
            }
            queries.push(image_by_user());
            const image_by_user_del=()=>{
                let object={
                    user_id     : PARAMS_IS_VALID.user_id,
                    image_id    : PARAMS_IS_VALID.image_id,
                    uploaded_timestamp  : PARAMS_IS_VALID.uploaded_timestamp,
                    delete_timestamp    : PARAMS_IS_VALID.delete_timestamp,
                    album_id    :PARAMS_IS_VALID.album_id,
                    publish     :PARAMS_IS_VALID.publish,
                    face_active :PARAMS_IS_VALID.face_active
                }
                let instace= new models.instance.image_by_user_del(object);
                return instace.save({return_query: true});
            }
            queries.push(image_by_user_del());
            callback(null,null);
        }
    ],function(err,result){
        //console.log(err);
        if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY});
        else {
            models.doBatch(queries,function(err){
                //console.log(err);
                delete params['user_id'];
                if(err) res.json({status: false,message: MESSAGE.SYSTEM_BUSY});
                else res.json({status: true,result: params});
            })
        }
    })
});

app.post("/payment/checkSendOTP", jsonParser,function(req,res,next){
    let params=req.body;
    var PARAMS_IS_VALID={};
    var results={};
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['user_id']= models.uuidFromString(params.id);
                PARAMS_IS_VALID['phone'] = params.phone,

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            models.instance.otp.find({ phone: PARAMS_IS_VALID.phone},{select :["phone","status"]},function(err,otp){
                results = (otp && otp.length > 0) ? {error : 0} : {error : 1, message: MESSAGE.PAYMENT_NOT_SEND_OTP};
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true , results });
    })
});
app.post("/forgotpassword/:phone", jsonParser,function(req,res,next){
    const rand=(max,min)=>{ return (Math.floor(Math.random() * (max - min + 1)) + min) };
    let {params}=req;
    var otpcode = rand(987678,154321);
    var otp_object={}
    var PARAMS_IS_VALID={};
    var results={};
    var queries=[];
    async.series([
        function(callback){
            PARAMS_IS_VALID['phone'] = params.phone;
            PARAMS_IS_VALID['token'] = params.token;
            otp_object={phone: PARAMS_IS_VALID.phone, otp: otpcode};
            callback(null,null);
        },
        function(callback){
            models.instance.user_by_phone.find({phone: params.phone},function(err,result){
                if(result && result.length > 0)
                    callback(err,null);
                else
                    callback(1,null);
                
            })
        },
        function(callback){
            const otp=()=>{
                let object      =otp_object;
                let instance    =new models.instance.otp(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(otp());
            models.doBatch(queries,function(err){
                callback(err,null);
            });
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, results});
        else res.json({ status: true });
    })
});
app.post("/forgot/newpassword", jsonParser,function(req,res,next){
    let params=req.body;
    let saltRounds=10;
    var _salt="",_hash="";
    var PARAMS_IS_VALID={};
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['phone'] = params.phone,
                PARAMS_IS_VALID['otp'] = Number(params.otp),
                PARAMS_IS_VALID['password'] = params.password,
                PARAMS_IS_VALID['repassword'] = params.password,

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            models.instance.otp.find({ phone: PARAMS_IS_VALID.phone, otp: PARAMS_IS_VALID.otp },{select :["phone","status"]},function(err,otp){
                otp && otp.length > 0 ? callback(null,null) : callback(MESSAGE.PAYMENT_OTP_WRONG,null);
            })
        },
        function(callback){
            bcrypt.genSalt(saltRounds,  function(err,salt){
                _salt=salt
                callback(err,null);
            });
        },
        function(callback){
            bcrypt.hash(params.password, _salt,   function(err,hash){
                _hash=hash;
                callback(err,null);
            });
        },
        function(callback){
            var query_object = { phone: PARAMS_IS_VALID.phone, enabled: true };
            var update_values_object = {password : _hash};
            var options = {ttl: 86400, if_exists: false};

            models.instance.user_by_phone_enable.update(query_object, update_values_object, options,function(err){
                callback(err,null);
            })
        },
    ],function(err,result){
        if (err) res.json({status: false, error: err});
        else res.json({ status: true });
    })
});
app.post("/forgot/checkOTP", jsonParser,function(req,res,next){
    let params=req.body;
    var PARAMS_IS_VALID={};
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['phone'] = params.phone,
                PARAMS_IS_VALID['otp'] = Number(params.otp),

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            models.instance.otp.find({ phone: PARAMS_IS_VALID.phone, otp: PARAMS_IS_VALID.otp },{select :["phone","status"]},function(err,otp){
                otp && otp.length > 0 ? callback(null,null) : callback(MESSAGE.PAYMENT_OTP_WRONG,null);
            })
        },
        function(callback){
            var query_object = { phone: PARAMS_IS_VALID.phone, otp: PARAMS_IS_VALID.otp };
            var update_values_object = {status : true};
            var options = {ttl: 86400, if_exists: false};

            models.instance.otp.update(query_object, update_values_object, options,function(err){
                callback(err,null);
            })
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, error: err});
        else res.json({ status: true });
    })
});
app.get("/payment/sendOTP/:token/:phone", jsonParser,function(req,res,next){
    const rand=(max,min)=>{ return (Math.floor(Math.random() * (max - min + 1)) + min) };
    let {params}=req;
    var otpcode = rand(987678,154321);
    var otp_object={}
    var PARAMS_IS_VALID={};
    var results={};
    var queries=[];
    async.series([
        function(callback){
            PARAMS_IS_VALID['phone'] = params.phone;
            PARAMS_IS_VALID['token'] = params.token;
            otp_object={phone: PARAMS_IS_VALID.phone, otp: otpcode};
            callback(null,null);
        },
        function(callback){
            const otp=()=>{
                let object      =otp_object;
                let instance    =new models.instance.otp(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(otp());
            models.doBatch(queries,function(err){
                callback(err,null);
            });
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, message: err});
        else res.json({ status: true });
    })
});
app.post("/payment/checkOTP", jsonParser,function(req,res,next){
    let params=req.body;
    var PARAMS_IS_VALID={};
    var queries=[];
    async.series([
        function(callback){
            try{
                PARAMS_IS_VALID['user_id']= models.uuidFromString(params.id);
                PARAMS_IS_VALID['phone'] = params.phone,
                PARAMS_IS_VALID['otp'] = Number(params.otp),

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            models.instance.otp.find({ phone: PARAMS_IS_VALID.phone, otp: PARAMS_IS_VALID.otp },{select :["phone","status"]},function(err,otp){
                otp && otp.length > 0 ? callback(null,null) : callback(MESSAGE.PAYMENT_OTP_WRONG,null);
            })
        },
        function(callback){
            var query_object = { phone: PARAMS_IS_VALID.phone, otp: PARAMS_IS_VALID.otp };
            var update_values_object = {status : true};
            var options = {ttl: 86400, if_exists: false};

            models.instance.otp.update(query_object, update_values_object, options,function(err){
                callback(err,null);
            })
        },
        function(callback){
            var query_object = { user_id: PARAMS_IS_VALID.user_id};
            var update_values_object = {mobile_active : true, phone: PARAMS_IS_VALID.phone};
            var options = {ttl: 86400, if_exists: false};

            models.instance.Users.update(query_object, update_values_object, options,function(err){
                callback(err,null);
            })
        },
        function(callback){
            const otp=()=>{
                let object      ={...PARAMS_IS_VALID, ...{status: true}};
                let instance    =new models.instance.otp_by_user(object);
                let save        =instance.save({return_query: true});
                return save;
            }
            queries.push(otp());
            models.doBatch(queries,function(err){
                callback(err,null);
            });
        },
        function(callback){
            callback(null,null);
        }
    ],function(err,result){
        if (err) res.json({status: false, results: {error: 1, message: err}});
        else res.json({ status: true , results: {error: 0, message: MESSAGE.PAYMENT_OTP_OK} });
    })
});
app.post("/login/OAuth/facebook", jsonParser,function(req,res,next){
    let params=req.body;
    var results=[];
    var PARAMS_IS_VALID={};
    var query={}
    async.series([
        function(callback){
            PARAMS_IS_VALID['user_id']      = models.uuidFromString(params.id);
            PARAMS_IS_VALID['private']      = params.authResponse ? params.authResponse.id      : null;
            PARAMS_IS_VALID['name']         = params.authResponse ? params.authResponse.name    : null;
            callback(null,null)   
        },
        function(callback){
            query={
                user_id: PARAMS_IS_VALID.user_id,
            }
            delete PARAMS_IS_VALID.user_id;
            console.log(PARAMS_IS_VALID);
            var update_values_object = {facebook: PARAMS_IS_VALID};
            var options = {ttl: 86400, if_exists: false};

            models.instance.user_by_details.update(query, update_values_object, options,function(err){
                console.log(err);
                callback(err,null);
            })
        },
        function(callback){
            models.instance.user_by_details.find(query,function(err,user){
                //console.log(err,user);
                results=(user && user.length > 0 ) ? user : [];
                callback(err,null);
            })
        }
    ],function(err,result){
        if(err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({status: true, result: results});
    });
});
app.post("/login/OAuth/google", jsonParser,function(req,res,next){
    let params=req.body;
    var results=[];
    var PARAMS_IS_VALID={};
    var query={}
    async.series([
        function(callback){
            PARAMS_IS_VALID['user_id']      = models.uuidFromString(params.id);
            PARAMS_IS_VALID['googleId']     = params.profileObj ? params.profileObj.googleId : null;
            PARAMS_IS_VALID['email']        = params.profileObj ? params.profileObj.email : null;
            callback(null,null)
        },
        function(callback){
            query={
                user_id: PARAMS_IS_VALID.user_id,
            }
            delete PARAMS_IS_VALID.user_id;
            var update_values_object = {emails: PARAMS_IS_VALID};
            var options = {ttl: 86400, if_exists: false};

            models.instance.user_by_details.update(query, update_values_object, options,function(err){
                callback(err,null);
            })
        },
        function(callback){
            models.instance.user_by_details.find(query,function(err,user){
                //console.log(err,user);
                results=(user && user.length > 0 ) ? user : [];
                callback(err,null);
            })
        }
    ],function(err,result){
        if(err) res.json({status: false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({status: true, result: results});
    });
});

app.get('/', function(req, res){
    if(req.secure){
        res.render('index'); 
    }
    else return res.redirect('https://' + req.hostname + req.url);
});

app.use(function(err,req,res,next){
    if (!module.parent) console.error(err.stack);
    if(req.secure){
        res.status(500).render('index');
    }
    else return res.redirect('https://' + req.hostname + req.url);
});

app.use(function(req, res, next){
    if(req.secure){
        res.status(404).render('index');
    }
    else return res.redirect('https://' + req.hostname + req.url);
});

var server = https.createServer(credentials, app);

if(!module.parent){
  server.listen(443, function(){
    console.log("server running at https://henhoradio.net/")
  });    
  app.listen(80, () => console.log('Started server on port 80!'));
}