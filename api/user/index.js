const router = require('express').Router();
const passport = require("passport");
const helper = require("./helper.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", function(err, user, info) {
        if (err) {
            return res.redirect('/status/danger/'+err+'/login');
        }
        if (!user) {
            return res.redirect('/status/warning/'+info.message+'/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.redirect('/status/danger/'+err+'/login');
            }
            return res.redirect('/dashboard');
        });
    })(req, res, next);
})

router.post('/logout',(req,res)=>{
    req.logOut()
    res.status(200).send({status : true})
})

router.post('/', (req,res) =>{
    var pass=bcrypt.hashSync(req.body.password,saltRounds);
    const user={
        firstName:req.body.firstName||'',
        lastName:req.body.lastName||'',
        password:pass,
        emailId:req.body.emailId,
        region:req.body.region||'',
        accessKey:req.body.accessKey||'',
        secretKey:req.body.secretKey||''
    }
    helper.createUser(user)
    .then(r =>{
        res.redirect('/')
    })
    .catch(err => {
        if(err.code=="E001"){
            res.redirect('/status/warning/'+err+'/register')
        }
        else{
            res.redirect('/status/warning/'+err+'/register')
        }
    })
})



router.post('/update',helper.auth, (req,res) =>{
    const user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        emailId:req.body.emailId,
        region:req.body.accountCredentials.region,
        accessKey:req.body.accountCredentials.accessKey,
        secretKey:req.body.accountCredentials.secretKey
    }
    helper.updateUser(user)
    .then(r =>{
        if(r.nModified){
            res.redirect('/status/success/User Setting saved successfully, changes reflect in launch stack/dashboard')
        }else{
            res.redirect('/status/warning/No changes to be update in user setting/dashboard')
        } 
    })        
    .catch(err => {
        res.redirect('/status/danger/'+err+'/dashboard')
    })
})


router.get("/:emailId", (req,res)=>{
    helper.viewUserByEmailId(req.params.emailId)
    .then(r=>res.status(200).json({"status":true,"data":r}))
    .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})

router.get("/currentUser/getData/",helper.auth,(req,res)=>{
    res.status(200).send({"status":true,"data":req.user})
})

router.get("/currentUser/name/",helper.auth,(req,res)=>{
    res.status(200).send({"status":true,"data":req.user.firstName})
})

module.exports=router
