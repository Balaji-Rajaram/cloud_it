const stackModel = require("../../model/stack")

let auth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/status/warning/Unauthorized access, Please login/login')
    }
}

let createStack=(params)=>{
  return new Promise((resolve,reject)=>{
    const newStack= new stackModel({
      userId:params.userId,
      name:params.name,
      launchTemplate:params.launchTemplate,
      status:params.status,
    })
    newStack.save(err =>{
      if(err){
          reject(err)
      }
      else{
          resolve(newStack)
      }
    })
  })
}

let viewStackByName=(stackName,userId)=>{
  return new Promise((resolve,reject)=>{
    stackModel.findOne({"userId":userId,"name":stackName}).populate('launchTemplate')
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}

let updateStack=(params)=>{
  return new Promise((resolve,reject)=>{
    stackModel.updateOne({"name":params.name},{"status":params.status})
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}

let viewStack=(userId)=>{
  return new Promise((resolve,reject)=>{
    stackModel.find({"userId":userId})
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}

let deleteStack=(stackName, userId)=>{
  return new Promise((resolve,reject)=>{
    stackModel.deleteOne({"name":stackName})
    .then(res=>{resolve(res)})
    .catch(err=>{reject(err)})
  })
}
module.exports={
  createStack,
  viewStackByName,
  updateStack,
  viewStack,
  deleteStack,
  auth
}