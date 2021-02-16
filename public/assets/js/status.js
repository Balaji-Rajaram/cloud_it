let path = window.location.pathname.split('/')

let method = path[2]
let message = decodeURI(path[3])
let redirect = path[4]

controller()

function controller() {
  document.getElementById('message').innerText=message
  switch (method) {
    case 'success':
      document.getElementById('indication').className="fa fa-check"
      document.getElementById('alertType').innerText="Success"
      break;
    case 'warning':
      document.getElementById('indication').className="fa fa-warning"
      document.getElementById('alertType').innerText="Warning"
      break;
    case 'danger':
      document.getElementById('indication').className="fa fa-close"
      document.getElementById('alertType').innerText="Danger"
      break;
    case 'info':
      document.getElementById('indication').className="fa fa-info-circle"
      document.getElementById('alertType').innerText="Information"
      break;
    default:
      document.getElementById('indication').className="fa fa-warning"
      document.getElementById('alertType').innerText="Warning"
      break;
  }

  switch (redirect) {
    case 'login':
      document.getElementById('redirectLink').innerText='Go to '+redirect
      document.getElementById('redirectLink').href='/'
      break;
  case 'dashboard':
      document.getElementById('redirectLink').innerText='Go to '+redirect
      document.getElementById('redirectLink').href='/dashboard'
      break;
  case 'viewStack':
      document.getElementById('redirectLink').innerText='Go to '+redirect
      document.getElementById('redirectLink').href='/viewStack'
      break;
  case 'register':
      document.getElementById('redirectLink').innerText='Go to '+redirect
      document.getElementById('redirectLink').href='/register'
      break;
    default:
      document.getElementById('redirectLink').innerText='Go to '+redirect
      document.getElementById('redirectLink').href='/'
      break;
  }
}