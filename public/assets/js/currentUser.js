var currentUserName
getCurrentUser()
async function getCurrentUser() {
  await fetch('/api/user/currentUser/name')
  .then(res=>res.json())
  .then(data=>{
    currentUserName=data.data;
    currentUserSet()})
}

function currentUserSet() {
  document.getElementById('currentUserName').innerText=currentUserName
}