let auth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).send("unauthorised")
    }
}

module.exports=auth