import { redirectTo } from "./router";

export function homeSetup() {
  //DOM References
  const loginBtn = document.getElementById("go-to-login");
  const registerBtn = document.getElementById("go-to-register");
  const loginCtaBtn = document.getElementById("cta-login");
  const registerCtaBtn = document.getElementById("cta-register");

  //Event Listeners
  loginBtn.addEventListener("click", () => redirectTo("/login"));
  loginCtaBtn.addEventListener("click", () => redirectTo("/login"));
  registerBtn.addEventListener("click", () => redirectTo("/register"));
  registerCtaBtn.addEventListener("click", () => redirectTo("/register"));
}
