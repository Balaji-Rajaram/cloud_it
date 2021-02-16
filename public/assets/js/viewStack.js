loadingShow()
getData()
let Obj={}
let dbObj={}
let awsObj={}
let active_stack=''
async function getData() {
  await fetch('/api/stack/')
  .then(res=>res.json())
  .then(data=>{
    Obj=data.data
    controller()
  })
}

function controller() {
  let cardHolder = document.getElementById('allStacks')

  let html=``
  Obj.forEach(element => {
    html=html+`<div class="shadow" style="padding: 15px;background: #ffffff;border-radius: 10px;margin-top: 0px;margin-bottom: 10px;" id="${element.name}" onclick=(describeStack('${element.name}'))>
                    <p style="margin-bottom: 0px;color: rgb(29,30,61);" id="${element.name}para">${element.name}</p>
                </div>`
  });
  cardHolder.innerHTML=html
  describeStack(Obj[0].name)
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

async function describeStack(name) {
  console.log(name);
  if (active_stack!=name) {
    document.getElementById('outputContainer').innerHTML=''
      document.getElementById('discription').innerText=''
    document.getElementById(name).style.background='rgb(113,117,216)'
    document.getElementById(name+'para').style.color='#ffffff'
    if (active_stack!='') {
      document.getElementById(active_stack).style.background='#ffffff'
      document.getElementById(active_stack+'para').style.color='rgb(29,30,61)'
    }
    active_stack=name
  await fetch('/api/stack/'+name)
  .then(res=>res.json())
  .then(data=>{
    dbObj=data.data
  })

  await fetch('/api/cloudFormation/describeStack/'+name)
  .then(res=>res.json())
  .then(data=>{
    awsObj=data.data
    mapdata(name)
  })
}
}


function mapdata(name) {
  console.log('called');
  awsObj.Stacks.forEach(function (element) {
    if(element.StackName==name){
      document.getElementById('status').innerText=element.StackStatus
      document.getElementById('createdAt').innerText=dbObj.createdAt
      document.getElementById('baseTemplate').innerText=dbObj.launchTemplate.name
      document.getElementById('deleteStack').href=`/api/cloudformation/deleteStack/${name}`
      document.getElementById('discription').innerText=element.Description
      var html=``
      awsObj.Stacks[0].Outputs.forEach(nelement => {
        console.log(nelement);
        html=html+`<p style="margin-bottom: 0px;margin-top: 0px;color: rgb(255,255,255);font-size: 14px;margin-right: 10px;">${nelement.OutputKey}</p><a href="${nelement.OutputValue}" style="font-size: 12px;color: rgb(95,203,163);">${nelement.OutputValue}</a>`
      });
      document.getElementById('outputContainer').innerHTML=html
    }
})
}