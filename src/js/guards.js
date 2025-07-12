import { Alert } from "./alerts";
import { redirectTo } from "./router";

export function dashboardGuard() {
  const userInfo = localStorage.getItem("currentUser");

  if (!userInfo) {
    Alert.info("Inicia Sesion");
    redirectTo("/login");
  }
}

export function loginGuard() {
  const userInfo = localStorage.getItem("currentUser");

  if (userInfo) {
    Alert.info("Ya tienes una sesion iniciada");
    redirectTo("/dashboard");
  }
}

export function isAdmin() {
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  return userInfo.roleId == "1";
}
