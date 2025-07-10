import { redirectTo } from "./routes.js";

//DOM References
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");

//API URL
const API_URL = ''

//Events
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Take current input values
  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  let response = await fetch()
});
