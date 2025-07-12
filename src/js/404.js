import { redirectTo } from "./router";

export function notFoundSetup() {
  //Take DOM References
  const backHomeP = document.getElementById("back-home");

  //Add listeners
  backHomeP.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/");
  });
}
