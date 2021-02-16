const router = require('express').Router();
const helper = require('./helper')


router.post('/default',helper.auth,(req,res)=>{
  let data = req.body
  console.log("default");
  helper.defaultLaunchStack(data,req.user)
    .then(d=>{res.redirect('/status/success/Your Stack '+data.stackName+' creation process was intiated from your account it take few more minutes to create/viewStack')})
  .catch(err=>{
    console.log(err);
    res.redirect('/status/danger/'+err+'/dashboard')})
})


router.post('/coustomize',helper.auth,(req,res)=>{
  let data = req.body
  console.log(data);
  helper.customize(data,req.user)
  .then(d=>{res.redirect('/status/success/Your coustomized Stack '+data.stackName+' creation process was intiated from your account it take few more minutes to create/viewStack')})
  .catch(err=>res.redirect('/status/danger/'+err+'/dashboard'))
})

router.get('/describeStack/:stackName',helper.auth,(req,res)=>{
  let data = req.params.stackName
  console.log(data);
  helper.describestack(data,req.user)
  .then(d=>{console.log(d); res.send({"status":"success","data":d})})
  .catch(err=>{console.log(err); res.status(500).send({"status":"failed","data":err})})
})

router.get('/deleteStack/:stackName',helper.auth,(req,res)=>{
  let data = req.params.stackName
  console.log(data);
  helper.deleteStack(data,req.user)
  .then(d=>{res.redirect('/status/success/Your Stack '+data+' has been successfully deleted from your account/dashboard')})
  .catch(err=>{res.redirect('/status/danger/'+err+'/dashboard')})
})


module.exports = router