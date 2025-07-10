export function isLogged() {
  userInfo = JSON.parse(localStorage.getItem("currentUser"));

  if (!userInfo) {
    window.location.href = "/";
    return false;
  }

  return true;
}

export function isWorker() {
  userInfo = JSON.parse(localStorage.getItem("currentUser"));

  if (!userInfo) {
    window.location.href = "/";
    return false;
  }

  if (userInfo.rolId == 0) {
    window.location.href = "../views/dashboard.html";
    return false;
  }

  return true;
}
