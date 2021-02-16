
const router = require('express').Router()
const path = require("path")
const {auth} = require('../api/user/helper')

router.get('/',(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/login.html"));
});

router.get('/dashboard',auth,(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/dashboard.html"));
});

router.get('/register',(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/register.html"));
});

router.get('/error',(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/error.html"));
});

router.get('/stack/:stackName',auth,(req, res,next) => {
    console.log(req.params.stackName);
    res.sendFile(path.join(__dirname, "../public/launchStack.html"));
});

router.get('/viewStack',auth,(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/viewStack.html"));
});

router.get('/describeStack/:stackName',auth,(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/describeStack.html"));
});

router.get('/status/:method/:message/:redirect',(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/notificaiton.html"));
});

router.get('/settings',auth,(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/settings.html"));
});

router.get('/detector',auth,(req, res,next) => {
    res.sendFile(path.join(__dirname, "/../public/detector.html"));
});

module.exports=router