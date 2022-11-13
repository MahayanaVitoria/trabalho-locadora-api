import Cliente from "./views/Cliente";
import Menu from "./views/Menu";
import Filmes from "./views/Filmes";
import Aluguel from "./views/Aluguel";



const getParams = match => {
    const values = match.result.slice(1);    
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return {}
}



const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/",            view: Menu },
        { path: "/clientes",    view: Cliente },
        { path: "/filmes",      view: Filmes},
        { path: "/alugueis",      view: Aluguel}
    ];

    // Test each route for match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    
    if (!match) {
        match = {
            route: routes[0],
            isMatch: True
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    await view.onRender()
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