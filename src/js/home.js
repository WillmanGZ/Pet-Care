import { isLogged, logout } from "./login";
import { redirectTo } from "./router";

export function homeSetup() {
  //DOM References
  const normalHeader = document.getElementById("landing-header");
  const loggedHeader = document.getElementById("logged-header");
  const loginBtn = document.getElementById("go-to-login");
  const registerBtn = document.getElementById("go-to-register");
  const loginCtaBtn = document.getElementById("cta-login");
  const registerCtaBtn = document.getElementById("cta-register");
  const goDashboardBtn = document.getElementById("go-to-dashboard");
  const logOutBtn = document.getElementById("logout-btn");

  //Event Listeners
  loginBtn.addEventListener("click", () => redirectTo("/login"));
  loginCtaBtn.addEventListener("click", () => redirectTo("/login"));
  registerBtn.addEventListener("click", () => redirectTo("/register"));
  registerCtaBtn.addEventListener("click", () => redirectTo("/register"));
  goDashboardBtn.addEventListener("click", () => redirectTo("/dashboard"));
  logOutBtn.addEventListener("click", () => logout());

  //Switch headers depending if the user is logged or not
  if (isLogged()) {
    normalHeader.classList.toggle("hidden");
    loggedHeader.classList.toggle("hidden");
    loginCtaBtn.classList.toggle("hidden");
    registerCtaBtn.classList.toggle("hidden");
  }
}
