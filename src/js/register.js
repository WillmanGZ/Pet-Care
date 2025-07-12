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
  const goLoginP = document.getElementById("register-go-login");
  const goBackP = document.getElementById("register-go-back");

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

    if (
      !validateForm(name, username, email, identity, address, password, phone)
    ) {
      return;
    }

    //Make new user
    const newUser = {
      name: name,
      username: username,
      identity: identity,
      phone: phone,
      address: address,
      email: email,
      password: password,
      roleId: "2",
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

  goLoginP.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/login");
  });

  goBackP.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/");
  });
}

function validateForm(
  name,
  username,
  email,
  identity,
  address,
  password,
  phone
) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;

  // Check if any required field is empty
  if (
    name === "" ||
    username === "" ||
    email === "" ||
    identity === "" ||
    address === "" ||
    phone === ""
  ) {
    Alert.warning("Todos los campos deben ser rellenados");
    return false;
  }

  // Check minimum length for username and password
  if (username.length < 3) {
    Alert.warning("El nombre de usuario debe contener al menos 3 caracteres");
    return false;
  }

  if (password.length < 3) {
    Alert.warning("La contraseña debe contener al menos 3 caracteres");
    return false;
  }

  // Check for valid email format
  if (!emailRegex.test(email)) {
    Alert.warning("Formato incorrecto de correo electronico.");
    return false;
  }

  // Check if identity is numeric
  if (isNaN(identity)) {
    Alert.warning("EL número de documento debe ser un número");
    return false;
  }

  //Check for valid phone format
  if (!phoneRegex.test(phone)) {
    Alert.warning("Formato incorrecto de telefono");
    return false;
  }

  // If all checks pass, return true
  return true;
}
