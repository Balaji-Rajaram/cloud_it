console.log("hi")

var Obj
getData()
async function getData() {
  await fetch('/api/user/currentUser/getData/')
  .then(res=>res.json())
  .then(data=>{
    Obj=data.data;
    controller()})
}


function controller() {
  console.log(Obj);
  document.getElementById('firstName').value=Obj.firstName
  document.getElementById('lastName').value=Obj.lastName
  document.getElementById('emailId').value=Obj.emailId
  document.getElementById('accessKey').value=Obj.accountCredentials.accessKey
  document.getElementById('secretKey').value=Obj.accountCredentials.secretKey
  document.getElementById('region').value=Obj.accountCredentials.region
}

document.getElementById('updateUser').onclick = function () {
  Obj.firstName=document.getElementById('firstName').value
  Obj.lastName=document.getElementById('lastName').value
  Obj.emailId=document.getElementById('emailId').value
  Obj.accountCredentials.accessKey=document.getElementById('accessKey').value
  Obj.accountCredentials.secretKey=document.getElementById('secretKey').value
  Obj.accountCredentials.region=document.getElementById('region').value
  console.log(Obj);
  fetch('/api/user/update', {
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
        alertNotificaiton('danger', err)
      })
}