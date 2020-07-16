const URL = "http://localhost:8000/heroes";


// show all superheroes

// API function


function getAllHeroes() {
    axios
        .get(URL + "?_sort=id&_order=asc")
        .then((apiRes) => {
            const heroes = apiRes.data;
            displayAllHeroes(heroes);
        })
        .catch((apiErr) => console.error(apiErr));
}

function displayAllHeroes(list) {
    const ul = document.getElementById("listAllHeroes");
    ul.innerHTML = "";
    list.forEach((hero) => {
        const li = document.createElement("li");
        li.classList.add("hero");
        // li.setAttribute("data-") ??? -> voir avec Guillaume
        li.innerHTML = `
        <h3>${hero.name} </h3>
        `;
        ul.appendChild(li);
    })
   
}

getAllHeroes();