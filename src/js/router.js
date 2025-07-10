import { homeSetup } from "./home";
import { loginSetup } from "./login";

const routes = {
  "/": {
    path: "../../src/views/home.html",
    setup: homeSetup,
  },
  "/register": {
    path: "../../src/views/register.html",
    setup: null,
  },
  "/login": {
    path: "../../src/views/login.html",
    setup: loginSetup,
  },
  "/dashboard": {
    path: "../../src/views/dashboard.html",
    setup: null,
  },
  "/notFound": {
    path: "../../src/views/404.html",
    setup: null,
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
