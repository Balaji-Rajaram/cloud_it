const stack = require("../stack/helper")
let auth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/status/warning/Unauthorized access, Please login/login')
    }
}

var AWS = require('aws-sdk');

// Set the region 
AWS.config.apiVersions = {
  cloudformation: '2010-05-15',
};

 AWS.config.update({
      "region":"ap-south-1"
    })

var cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});
let defaultTemplate={}

let defaultLaunchStack = (params,user)=>{
  return new Promise((resolve,reject)=>{
    defaultTemplate=JSON.parse(params.template)

    let stackData={
      userId:user.id,
      name:params.stackName,
      launchTemplate:params._id,
      status:"CREAT_IN_PROGRESS"
    }

    if(params.isGithubReq){
      defaultTemplate.Parameters.GitUrl.Default=params.githubUrl
      let gitDir=params.githubUrl.split('/')
      let Dir=gitDir[gitDir.length-1]
      defaultTemplate.Parameters.RepoName.Default=Dir
    }
    var templateString=JSON.stringify(defaultTemplate)
    var cloudParams = {
      StackName: params.stackName, 
      
      Tags: [
        {
          Key: 'CIT',
          Value: 'created from CIT app'
        },
      ],
      TemplateBody:templateString,
    };
    console.log(defaultTemplate);
    cloudformation.createStack(cloudParams, function(err, data) {
      if (err) reject(err); 
      else {
        stack.createStack(stackData)
        .then(r=>{resolve(data)})
        .catch(e=>{reject(e);})
      };        
    });
  })
}

let customize = (params,user)=>{
  return new Promise((resolve,reject)=>{
    defaultTemplate=JSON.parse(params.template)
    //coustomizing cft template
    if(params.isGithubReq){
      defaultTemplate.Parameters.GitUrl=params.gitUrl
      let gitDir=params.gitUrl.split('/')
      let Dir=gitDir[gitDir.length]
      defaultTemplate.Parameters.RepoName=Dir
    }
    Object.keys(params.customizeOption).forEach(function (key) {
      let Tpath=params.customizeOption[key].path
      let splitValue=Tpath.split('.')
      switch (splitValue.length) {
        case 3:
          defaultTemplate[splitValue[0]][splitValue[1]][splitValue[2]]=params.customizeOption[key].value
          break;
        case 4:
          defaultTemplate[splitValue[0]][splitValue[1]][splitValue[2]][splitValue[3]]=params.customizeOption[key].value
          break;
        default:
          console.log('default block executed');
          break;
      }
    })
    console.log(defaultTemplate);

    //converting json to json string
    var templateString=JSON.stringify(defaultTemplate)

    //store stack detail in db
    let stackData={
      userId:user.id,
      name:params.stackName,
      launchTemplate:params._id,
      status:"CREATION_PROCESSING"
    }
    console.log(stackData);

    // creating cloud params
    var cloudParams = {
      StackName: params.stackName, 
      
      Tags: [
        {
          Key: 'CIT',
          Value: 'created from CIT app'
        },
      ],
      TemplateBody:templateString,
    };

    // call aws sdk to create stack
    cloudformation.createStack(cloudParams, function(err, data) {
      if (err) reject(err); 
      else {
        stack.createStack(stackData)
        .then(r=>{resolve(data)})
        .catch(e=>{reject(e);})
      };        
    });
  })
}

let describestack=(p1,user)=>{
  return new Promise((resolve,reject)=>{
    var params = {
    StackName: p1.stackName
    };
    cloudformation.describeStacks(params, function(err, data) {
      if (err) reject(err); 
      else resolve(data);           
    });
  })
}


let deleteStack=(p1,user)=>{
  return new Promise((resolve,reject)=>{
    var params = {
      StackName: p1
    };
    cloudformation.deleteStack(params, function(err, data) {
      if (err) reject(err); 
      else {
        stack.deleteStack(p1)
        .then(r=>{resolve(data)})
        .catch(err=>{reject(err)})
      };           
    });
  })
}

module.exports={
  customize,
  describestack,
  auth,
  defaultLaunchStack,
  deleteStack
}