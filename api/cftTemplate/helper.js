const cftTemplateModel = require("../../model/cftTemplate")

let createCftTemplate=(params)=>{
  return new Promise((resolve,reject)=>{
    const newCftTemplate= new cftTemplateModel({
      name:params.name,
      isGithubReq:params.isGithubReq,
      isCustomizable:params.isCustomizable,
      customizeOption:params.customizeOption,
      template:params.template
    })
    newCftTemplate.save(err =>{
      if(err){
          reject(err)
      }
      else{
          resolve(newCftTemplate)
      }
    })
  })
}

let viewCftTemplateNameByName=(name)=>{
  return new Promise((resolve,reject)=>{
    cftTemplateModel.findOne({"name":name})
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}

let updateCftTemplate=(params)=>{
  return new Promise((resolve,reject)=>{
    let updateQuery={
      isGithubReq:params.isGithubReq,
      isCustomizable:params.isCustomizable,
      customizeOption:params.customizeOption,
      template:params.template
    }
    cftTemplateModel.updateOne({"name":params.name},updateQuery)
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}

let viewCftTemplate=()=>{
  return new Promise((resolve,reject)=>{
    cftTemplateModel.find()
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}

let deleteCftTemplate=(name)=>{
  return new Promise((resolve,reject)=>{
    cftTemplateModel.deleteOne({"name":name})
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}
module.exports={
  createCftTemplate,
  viewCftTemplateNameByName,
  updateCftTemplate,
  viewCftTemplate,
  deleteCftTemplate
}