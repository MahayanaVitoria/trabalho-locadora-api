import Cadastro from "./views/Cadastro";
import Menu from "./views/Menu";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};


const router = async () => {
    const routes = [
        { path: "/", view: Menu },
        { path: "/cadastro", view: Cadastro},
        // { path: "/catalogo", view: () => console.log("Viewing Catalogo") }
    ];

    // Test each route for match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    
    if (!match) {
        match = {
            route: routes[0],
            isMatch: True
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })

    router();
})