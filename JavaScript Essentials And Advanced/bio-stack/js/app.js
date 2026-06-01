import {
    saveLinks,
    getLinks
}
from "./storage.js";

import {
    validateURL
}
from "./validation.js";

import {
    renderLinks
}
from "./ui.js";

import {
    initializeTheme,
    toggleTheme
}
from "./theme.js";

const form =
document.getElementById("linkForm");

const titleInput =
document.getElementById("title");

const urlInput =
document.getElementById("url");

const preview =
document.getElementById("preview");

const error =
document.getElementById("error");

const themeBtn =
document.getElementById("themeBtn");

let links = getLinks();

initializeTheme();

renderLinks(
    links,
    preview
);

form.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const title =
        titleInput.value.trim();

        const url =
        urlInput.value.trim();

        if(
            title === "" ||
            url === ""
        ){

            error.textContent =
            "All fields are required";

            return;
        }

        if(
            !validateURL(url)
        ){

            error.textContent =
            "URL must start with https://";

            return;
        }

        error.textContent = "";

        const newLink = {
            title,
            url
        };

        links.push(newLink);

        saveLinks(links);

        renderLinks(
            links,
            preview
        );

        form.reset();

    }
);

preview.addEventListener(
    "click",
    function(e){

        if(
            e.target.classList.contains(
                "remove-btn"
            )
        ){

            const index =
            e.target.dataset.index;

            links.splice(index,1);

            saveLinks(links);

            renderLinks(
                links,
                preview
            );

        }

    }
);

themeBtn.addEventListener(
    "click",
    toggleTheme
);