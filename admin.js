
const fs              = require('fs');
const express         = require('express');
const async           = require("async");
const bcrypt          = require("bcryptjs");
const moment          = require("moment");
const http            = require('http');
const path            = require('path');
const jsonParser	  = require('body-parser').json();
const multer          = require('multer');
const app             = module.exports=express();
const models          = require("./settings_db");
const Uuid            = require("cassandra-driver").types.Uuid;
const upload          = multer();
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


app.post("/accounts/add", jsonParser,function(req,res,next){
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
            PARAM_IS_VALID["dob_day"]   = moment(params.dob).day;
            PARAM_IS_VALID["dob_month"] = moment(params.dob).month;
            PARAM_IS_VALID["dob_year"]  = moment(params.dob).year;
            PARAM_IS_VALID["gender"]    = Number(params.gender);
            PARAM_IS_VALID["enabled"]   = true;
            PARAM_IS_VALID['address']   = params.address;
            PARAM_IS_VALID['user_id']   = user_id;

            PARAM_IS_VALID['appearance']  = params.appearance;
            PARAM_IS_VALID['children']  = params.children; //
            PARAM_IS_VALID['drink']  = params.drink; //
            PARAM_IS_VALID['graduation']  = params.education;
            PARAM_IS_VALID['eyecolor']  = params.eyecolor; //
            PARAM_IS_VALID['food']  = params.food; //
            PARAM_IS_VALID['monthly_income']  = params.income && params.income.value;
            PARAM_IS_VALID['nation']  = params.nation; //
            PARAM_IS_VALID['relationship_status']  = params.relationship_status;
            PARAM_IS_VALID['religion']  = params.religion;
            PARAM_IS_VALID['jealousy']  = params.responsiveness;
            PARAM_IS_VALID['smoking']  = params.smoking;
            PARAM_IS_VALID['sport']  = params.sport;
            PARAM_IS_VALID['travel']  = params.travel;
            PARAM_IS_VALID['jobs'] = params.workingstate;
            user={
                user_id: PARAM_IS_VALID['user_id'],
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
            bcrypt.hash(params.password, _salt, function(err,hash){
                _hash=hash;
                callback(err,null);
            });
        },
        function(callback){

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
                dob_year        : PARAM_IS_VALID.dob_year,
                fullname        : PARAM_IS_VALID.fullname,
                created_date    : new Date().getTime(),
                user_id         : user_id,
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
                    user_id : PARAM_IS_VALID.user_id,
                    hhr_goal: PARAM_IS_VALID.hhr_goal,
                    appearance: PARAM_IS_VALID.appearance,
                    graduation: PARAM_IS_VALID.graduation,
                    monthly_income: PARAM_IS_VALID.monthly_income,
                    relationship_status: PARAM_IS_VALID.relationship_status,
                    religion: PARAM_IS_VALID.religion,
                    jealousy: PARAM_IS_VALID.jealousy,
                    smoking: PARAM_IS_VALID.smoking,
                    sport: PARAM_IS_VALID.sport,
                    travel: PARAM_IS_VALID.travel,
                    jobs: PARAM_IS_VALID.jobs,
                };
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
        if(err) res.json({status: false});
        else
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

app.post('/accounts/getUserList', jsonParser, function(req, res){
	var results =[];
    var n       =20;
    var total   =0;
    var params    =req.body;
    var VALID_PARAMS=[];
    async.series([
        function(callback){
            try{
                VALID_PARAMS['page']        = Number(params.page) > 0 ? Number(params.page) : 1 ;

                callback(null,null);
            }catch(e){
                callback(e,null);
            }

        },
        function(callback){
            models.instance.Users.eachRow({},{autoPage : true},function(n,users){
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
    ],function(err,result){
        if(err) res.json({status:false, message: MESSAGE.SYSTEM_BUSY});
        else res.json({ status: true, users: results,total: total});
    });
});

app.get('/', function(req, res){
	res.render('admin');
});

app.use(function(err,req,res,next){
	if (!module.parent) console.error(err.stack);
	res.status(500).render('admin');
});

app.use(function(req, res, next){
    res.status(404).render('admin');
});

if(!module.parent){
  app.listen(8080, () => console.log('Example app listening on port 8080!'));
}
