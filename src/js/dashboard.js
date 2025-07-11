import { dashboardGuard } from "./guards";
import { logout } from "./login";
import { redirectTo } from "./router";

export function dashboardSetup() {
  dashboardGuard();

  //Take DOM References
  const newPetModal = document.getElementById("pet-form-modal");
  const addPetBtn = document.getElementById("add-pet-btn");
  const goHomeBtn = document.getElementById("go-home-btn");
  const logOutBtn = document.getElementById("logout-btn");
  const cancelPetBtn = document.getElementById("cancel-pet-form");

  //Add listeners
  addPetBtn.addEventListener("click", () => {
    newPetModal.classList.toggle("hidden");
  });

  cancelPetBtn.addEventListener("click", () => {
    newPetModal.classList.toggle("hidden");
  });

  goHomeBtn.addEventListener("click", () => {
    redirectTo("/");
  });

  logOutBtn.addEventListener("click", () => {
    logout();
  });
}
