import {
    saveTheme,
    getTheme
}
from "./storage.js";

export function initializeTheme(){

    const theme = getTheme();

    document.body.classList.add(theme);

}

export function toggleTheme(){

    if(document.body.classList.contains("light")){

        document.body.classList.remove("light");

        document.body.classList.add("dark");

        saveTheme("dark");

    }
    else{

        document.body.classList.remove("dark");

        document.body.classList.add("light");

        saveTheme("light");

    }

}