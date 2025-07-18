import { notFoundSetup } from "./404";
import { dashboardSetup } from "./dashboard";
import { homeSetup } from "./home";
import { loginSetup } from "./login";
import { registerSetup } from "./register";

const routes = {
  "/": {
    path: "../../src/views/home.html",
    setup: homeSetup,
  },
  "/register": {
    path: "../../src/views/register.html",
    setup: registerSetup,
  },
  "/login": {
    path: "../../src/views/login.html",
    setup: loginSetup,
  },
  "/dashboard": {
    path: "../../src/views/dashboard.html",
    setup: dashboardSetup,
  },
  "/notFound": {
    path: "../../src/views/404.html",
    setup: notFoundSetup,
  },
};

export async function renderRoute() {
  const app = document.getElementById("app");

  const path = window.location.pathname;
  const route = routes[path] || routes["/notFound"];

  try {
    const file = await fetch(route.path);
    const content = await file.text();

    app.innerHTML = content;

    if (route.setup) {
      route.setup();
    }
  } catch (error) {
    redirectTo("/notFound");
  }
}

export function redirectTo(path) {
  window.history.pushState({}, "", `${path}`);
  return renderRoute();
}

window.addEventListener("popstate", renderRoute);
