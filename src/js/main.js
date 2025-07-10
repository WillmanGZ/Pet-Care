import { redirectTo } from "./routes";

//DOM References
const loginBtn = document.getElementById("go-to-login");
const registerBtn = document.getElementById("go-to-register");
const loginCtaBtn = document.getElementById("cta-login");
const registerCtaBtn = document.getElementById("cta-register");

//Event Listeners
loginBtn.addEventListener("click", () => redirectTo("./src/views/login.html"));
loginCtaBtn.addEventListener("click", () =>
  redirectTo("./src/views/login.html")
);
registerBtn.addEventListener("click", () =>
  redirectTo("./src/views/register.html")
);
registerCtaBtn.addEventListener("click", () =>
  redirectTo("./src/views/register.html")
);