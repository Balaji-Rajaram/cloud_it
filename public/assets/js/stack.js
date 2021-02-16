
$('.alert').hide()

function alertNotificaiton(ntype, nMessage) {
  document.getElementById('alertMessage').innerText=nMessage
  document.getElementById('alertBox').className="alert alert-"+ntype
  $('.alert').show()  
}
let STACK_NAME=window.location.pathname;
STACK_NAME=STACK_NAME.split('/')[2]

var Obj
loadingShow()
getData()
async function getData() {
  await fetch('/api/template/'+STACK_NAME)
  .then(res=>res.json())
  .then(data=>{
    Obj=data.data;
    Obj['customizeOption']=JSON.parse(Obj['customizeOption'])
    controller()})
}


function controller() {
  console.log(Obj);
  //github continer controller
  if(Obj.isGithubReq){document.getElementById('gitContainer').style.display="block"}
  else{document.getElementById('gitContainer').style.display='none'}

  //coustomize continer contoller
  if(Obj.isCustomizable){ document.getElementById('launchOption').style.display="block"; }
  else{ document.getElementById('launchOption').style.display="none"; }
  setTimeout(loadingHide, 3000)
  
}

function loadingHide(){
  document.getElementById('loadingImage').style.display="none"
  document.getElementById('loadingGif').style.display="none"
  document.getElementById('content').style.display="block"
  return
}

function loadingShow(){
  document.getElementById('loadingImage').style.display="block"
  document.getElementById('loadingGif').style.display="block"
  document.getElementById('content').style.display="none"
  return
}



//controller for default option
const defaultLaunchType = document.getElementById('defaultLaunchType')
defaultLaunchType.onclick = function(){
  document.getElementById('customizeSection').style.display="none"
}


//controller for coustomize option
const customizeLaunchType = document.getElementById('customizeLaunchType')
customizeLaunchType.onclick = function(){
  document.getElementById('customizeSection').style.display="block"

  var customizeInpHtml=``
  Object.keys(Obj.customizeOption).forEach(function (key) {
    customizeInpHtml=customizeInpHtml+` <p style="font-size: 14px;color: rgb(29,30,61);margin-bottom: 0px; margin-top:20px">${key}</p>
                        <div class="d-flex d-xl-flex flex-fill justify-content-start justify-content-xl-start"><input class="flex-fill" type="text" style="color: rgb(122,122,122);font-size: 14px;border-radius: 0px;border-width: 1px;border-style: none;border-bottom-style: solid;border-bottom-color: rgb(29,30,61);" id="${key}" value="${Obj.customizeOption[key].value}"></div>`
  })

  document.getElementById('customizeInpSection').innerHTML=customizeInpHtml
}

//final launch button controller
const launchStack = document.getElementById('launchStack')
launchStack.onclick = function(){

  document.getElementById('loadingImage').style.display="block"
  document.getElementById('loadingGif').style.display="block"
  document.getElementById('content').style.display="none"
  const stackName = document.getElementById('stackName').value

  Obj["stackName"]=stackName
  //default stack launch
  if(stackName){
    if(defaultLaunchType.checked){
    
    console.log("default called");
    // getting github url from the user
    if(Obj.isGithubReq){Obj["githubUrl"]=document.getElementById('githubUrl').value}

    //request server to launch the stack
    fetch('/api/cloudFormation/default', {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: 'post',
      body:JSON.stringify(Obj)
      }).then(res=>{
        window.location=res.url
      })
      .catch(err=>{
        window.location='/status/danger/'+err+'/dashboard'
      })
  }

  // customize stack launch
    if(customizeLaunchType.checked && stackName){
      
      // getting github url from the user
      if(Obj.isGithubReq){Obj["githubUrl"]=document.getElementById('githubUrl').value}

      // getting coustomize input from the user and map to the json object
      Object.keys(Obj.customizeOption).forEach(function (key) {
        Obj.customizeOption[key].value=document.getElementById(key).value
      })

      //request server to create coutomize stack
      fetch('/api/cloudFormation/coustomize', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body:JSON.stringify(Obj)
      }).then(res=>{
        window.location=res.url
      })
      .catch(err=>{
        window.location='/status/danger/'+err+'/dashboard'
      })
      console.log(Obj.customizeOption);
    }
  }
  else{
    window.location='/status/warning/stack name required/dashboard'
  }
  
}