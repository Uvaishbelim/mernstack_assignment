export function saveLinks(links){

    localStorage.setItem(
        "links",
        JSON.stringify(links)
    );

}

export function getLinks(){

    return JSON.parse(
        localStorage.getItem("links")
    ) || [];

}

export function saveTheme(theme){

    localStorage.setItem(
        "theme",
        theme
    );

}

export function getTheme(){

    return localStorage.getItem(
        "theme"
    ) || "light";

}