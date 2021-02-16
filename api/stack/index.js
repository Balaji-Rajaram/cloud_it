const router = require('express').Router();
const helper = require("./helper.js");


router.post('/', (req,res) =>{
    const stack={
        name:req.body.name,
        launchTemplate:req.body.launchTemplate,
        status:req.body.status,
    }
    helper.createStack(stack)
    .then(r =>{
        res.status(201).json({"status":true,"data":"stack created successfully"})
    })
    .catch(err => {
        if(err.code=="E001"){
            res.status(409).json({"status":false,"data":err.message})
        }
        else{
            res.status(500).json({"status":false,"data":err.message})
        }
    })
})



router.put('/', (req,res) =>{
    const stack={
      name:req.body.name,
      status:req.body.status,
    }
    helper.updatestack(stack)
    .then(r =>{
      if(r.nModified){
          res.status(200).json({"status":true})
      }else{
          res.status(304).json({"status":false,"data":"not modified"})
      } 
    })        
    .catch(err => {
      res.status(500).json({"status":false,"data":err.message})
    })
})


router.get("/:stackName", (req,res)=>{
    helper.viewStackByName(req.params.stackName,req.user.id)
    .then(r=>res.status(200).json({"status":true,"data":r}))
    .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})

router.get("/",helper.auth,(req,res)=>{
    helper.viewStack(req.user.id)
    .then(r=>res.status(200).json({"status":true,"data":r}))
    .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})


router.get("/delete/:stackName",helper.auth,(req,res)=>{
    helper.deleteStack(req.params.stackName,req.user.id)
    .then(r=>res.redirect('/viewStack'))
    .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})

module.exports=router