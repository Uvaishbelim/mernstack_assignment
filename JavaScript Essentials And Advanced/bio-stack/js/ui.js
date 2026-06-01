export function renderLinks(
    links,
    container
){

    container.innerHTML = "";

    links.forEach((link,index)=>{

        container.innerHTML += `
        
        <div class="link-card">

            <a
                href="${link.url}"
                target="_blank"
                class="link-btn"
            >
                ${link.title}
            </a>

            <button
                class="remove-btn"
                data-index="${index}"
            >
                Remove
            </button>

        </div>
        
        `;

    });

}