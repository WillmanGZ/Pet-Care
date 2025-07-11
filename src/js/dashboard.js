import { redirectTo } from "./router";

export function dashboardSetup() {
  //Take DOM References
  const newPetModal = document.getElementById("pet-form-modal");
  const addPetBtn = document.getElementById("add-pet-btn");
  const logOutBtn = document.getElementById("logout-btn");
  const cancelPetBtn = document.getElementById("cancel-pet-form");

  //Add listeners
  addPetBtn.addEventListener("click", () => {
    newPetModal.classList.toggle("hidden");
  });

  cancelPetBtn.addEventListener("click", () => {
    newPetModal.classList.toggle("hidden");
  });

  logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    redirectTo("/");
  });
}
