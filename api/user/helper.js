const userModel = require("../../model/user")

let auth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/status/warning/Unauthorized access, Please login/login')
    }
}

let createUser=(params)=>{
  return new Promise((resolve,reject)=>{
    const newUser= new userModel({
        firstName:params.firstName,
        lastName:params.lastName,
        emailId:params.emailId,
        password:params.password,
        accountCredentials:{
          region:params.region,
          accessKey:params.accessKey,
          secretKey:params.accessKey
        }

    })
    newUser.save(err =>{
        if(err){
            reject(err)
        }
        else{
            resolve(newUser)
        }
    })
  })
}

let findById=(id)=>{
    return new Promise((resolve,reject)=>{
        userModel.findById(id)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}


let viewUserByEmailId=(emailId)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({"emailId":emailId})
        .then(res=>{resolve(res)})
        .catch(err=>{reject(err)})
    })
}


let updateUser=(params)=>{
    return new Promise((resolve,reject)=>{
        let updateQuery={
          firstName:params.firstName,
          lastName:params.lastName,
          accountCredentials:{
            region:params.region,
            accessKey:params.accessKey,
            secretKey:params.secretKey
          }
        }
        userModel.updateOne({"emailId":params.emailId},updateQuery)
        .then(res=>{resolve(res)})
        .catch(err=>{reject(err)})
    })
}


module.exports={
  createUser,
  findById,
  viewUserByEmailId,
  updateUser,
  auth
}