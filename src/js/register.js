import { Alert } from "./alerts.js";
import { redirectTo } from "./router.js";
import { sleep } from "./sleep.js";

export function registerSetup() {
  //DOM References
  const registerForm = document.getElementById("register-form");
  const nameInput = document.getElementById("register-name");
  const usernameInput = document.getElementById("register-username");
  const identityInput = document.getElementById("register-identity");
  const addressInput = document.getElementById("register-address");
  const emailInput = document.getElementById("register-email");
  const phoneInput = document.getElementById("register-phone");
  const passwordInput = document.getElementById("register-password");

  //API URL
  const API_URL = "http://localhost:3000";

  //Events
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Take current input values
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const identity = identityInput.value.trim();
    const address = addressInput.value.trim();
    const password = passwordInput.value;
    const phone = phoneInput.value.trim();

    //Make new user
    const newUser = {
      name: name,
      username: username,
      identity: identity,
      phone: phone,
      address: address,
      email: email,
      password: password,
      roleId: "1",
    };

    //Post new user in DB
    let response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      Alert.success("Usuario registrado correctamente!");
      sleep(2000);
      redirectTo("/login");
    } else {
      Alert.error(
        `No se pudo registrar el usuario, error ${response.status}. Vuelva a intentarlo mas tarde`
      );
    }
  });
}
