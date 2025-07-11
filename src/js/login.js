import { redirectTo } from "./router.js";
import { sleep } from "./sleep.js";
import { Alert } from "./alerts.js";
import { loginGuard } from "./guards.js";

export function loginSetup() {
  loginGuard();

  //DOM References
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const goRegisterP = document.getElementById("login-go-register");

  //API URL
  const API_URL = "http://localhost:3000";

  //Events
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Take current input values
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    //Get user info
    let response = await fetch(`${API_URL}/users?username=${username}`);
    const data = await response.json();
    const userData = data[0];

    //If the information is correct, user will login
    if (!userData) {
      Alert.error("Este usuario no se encuentra registrado");
    } else if (userData.password != password) {
      Alert.error("Contraseña incorrecta");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(userData));
      Alert.success("Has ingresado correctamente");
      await sleep(2000);
      redirectTo("/dashboard");
    }
  });

  goRegisterP.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/register");
  });
}
