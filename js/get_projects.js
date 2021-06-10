const divResult = document.getElementById("divResult");

async function getRepos() {
    clear();
    //alert("test")
    const url = "https://api.github.com/search/repositories?q=user:TheSaltyPug";
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
    //result.items.forEach(i=>console.log(i.full_name))
    result.items.forEach((i) => {
        // github link
        // wiki link
        // image link
        // description link
        // title

        const github_link = document.createElement("a");
        github_link.className = "greenbox";
        github_link.href = i.html_url;
        github_link.textContent = "GitHub";

        const github_wiki = document.createElement("a");
        if (i.has_wiki === true) {
            github_wiki.className = "purplebox";
            github_wiki.href = i.html_url + "/wiki";
            github_wiki.textContent = "Wiki";
        }

        const github_release = document.createElement("a");
        github_release.className = "bluebox";
        github_release.href = i.html_url + "/releases";
        github_release.textContent = "Downloads";

        const item_list = document.createElement("li");
        item_list.appendChild(github_release);
        item_list.appendChild(github_link);
        if (i.has_wiki === true) {
            item_list.appendChild(github_wiki);
        }

        const project_image = document.createElement("img");
        project_image.src = "https://raw.githubusercontent.com/" + i.full_name + "/master/index.png";
        project_image.onerror = function(){project_image.src = "./images/coming_soon.png"; project_image.onerror = null};
        project_image.alt = i.name + " image";

        const project_name = document.createElement("p");
        project_name.className = "header";
        project_name.innerText = i.name;

        const project_desc = document.createElement("p");
        project_desc.className = "body";
        project_desc.innerText = i.description;

        const project_caption = document.createElement("figcaption");
        project_caption.style = "text-align: center";
        project_caption.appendChild(project_name);
        project_caption.appendChild(project_desc);
        project_caption.appendChild(document.createElement("br"));
        project_caption.appendChild(item_list);

        const project = document.createElement("figure");
        project.className = "grid-item";
        project.appendChild(project_image);
        project.appendChild(project_caption);

        divResult.appendChild(project);
    });
}
function clear() {
    while (divResult.firstChild) divResult.removeChild(divResult.firstChild);
}
