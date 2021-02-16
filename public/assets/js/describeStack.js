


let STACK_NAME=window.location.pathname.split('/')[2]
console.log(STACK_NAME);

getdbData()
let dbObj={}
let awsObj={}

async function getdbData() {
  await fetch('/api/stack/'+STACK_NAME)
  .then(res=>res.json())
  .then(data=>{
    dbObj=data.data
  })
}
getawsData()

async function getawsData() {
  await fetch('/api/cloudFormation/describeStack/'+STACK_NAME)
  .then(res=>res.json())
  .then(data=>{
    awsObj=data.data
    controller()
  })
}

function controller() {
  document.getElementById('stackName').innerText=dbObj.name
  document.getElementById('status').innerText=awsObj.Stacks[0].StackStatus
  document.getElementById('status').style.color='(var --green)'
  document.getElementById('createdAt').innerText=dbObj.createdAt
  document.getElementById('baseTemplate').innerText=dbObj.launchTemplate.name
  document.getElementById('deleteStack').href=`/api/cloudformation/deleteStack/${STACK_NAME}`
  document.getElementById('discription').innerText=awsObj.Stacks[0].Description
  var html=``
  awsObj.Stacks[0].Outputs.forEach(element => {
    console.log(element);
    html=html+`<p style="margin-bottom: 7px;font-weight: normal;font-size: 16px;color: rgb(81,81,81);">${element.OutputKey}</p><a href="${element.OutputValue}">${element.OutputValue}</a>`
  });
  document.getElementById('outputContainer').innerHTML=html
}