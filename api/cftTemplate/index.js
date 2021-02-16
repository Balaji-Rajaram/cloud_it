const router = require('express').Router();
const helper = require("./helper.js");


router.post('/', (req,res) =>{
  const cftTemplate={
    name:req.body.name,
    isGithubReq:req.body.isGithubReq,
    isCustomizable:req.body.isCustomizable,
    customizeOption:req.body.customizeOption,
    template:req.body.template
  }
  helper.createCftTemplate(cftTemplate)
  .then(r =>{
    res.status(201).json({"status":true,"data":"cftTemplate created successfully"})
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
  const cftTemplate={
    name:req.body.name,
    isGithubReq:req.body.isGithubReq,
    isCustomizable:req.body.isCustomizable,
    customizeOption:req.body.customizeOption,
    template:req.body.template
  }
  helper.updateCftTemplate(cftTemplate)
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


router.get("/:name", (req,res)=>{
  helper.viewCftTemplateNameByName(req.params.name)
  .then(r=>res.status(200).json({"status":true,"data":r}))
  .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})

router.get("/", (req,res)=>{
  helper.viewCftTemplate()
  .then(r=>res.status(200).json({"status":true,"data":r}))
  .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})


router.delete("/", (req,res)=>{
  helper.deleteCftTemplate(req.body.name)
  .then(r=>res.status(200).json({"status":true,"data":r}))
  .catch(err=>res.status(500).json({"status":false,"data":err.message}))
})


module.exports=router
