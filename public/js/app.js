const URL = "http://localhost:8000/heroes";
const formPostHero = document.getElementById("form-post-hero");

// show all superheroes

// API function

async function postNewHero() {
    const name = document.getElementById("name").value;
    const aliases = document.getElementById("aliases").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const publisher = document.getElementById("publisher").value;
    const race = document.getElementById("race").value;
    const gender = formPostHero.querySelector("input:checked").value;

    try {
        await axios.post(URL, {
            name,
            aliases,
            gender,
            weight,
            height,
            race,
            publisher,

        });

        getAllHeroes();

    } catch (err) {
        console.error(err);
    }

}



function getAllHeroes() {
    axios
        .get(URL + "?_sort=id&_order=desc")
        .then((apiRes) => {
            const heroes = apiRes.data;
            displayAllHeroes(heroes);
        })
        .catch((apiErr) => console.error(apiErr));
}

function getOneHero(id) {
    axios
        .get(`${URL}/${id}`)
        .then((apiRes) => {
            const hero = apiRes.data;
            displayOneHero(hero);
        })
        .catch((apiErr) => console.error(apiErr));
}

async function deleteOneHero(id) {
    console.log(id);
    try {
        await axios.delete(`${URL}/${id}`);
        removeHero(id)
    } catch (err) {
        console.error(err)
    }
}

//DOM FUNCTIONS

function removeHero(idHero) {
    const suppHero = document.querySelector(`[data-user-id="${idHero}"]`);
    suppHero.remove();
}


function displayOneHero(hero) {
    const section = document.getElementById("modal-container");
    section.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("modal")
    div.innerHTML = `<h2>${hero.name}</h2>
    <img src="${hero.image && hero.image.url || 'https://www.stageusa.fr/wp-content/uploads/2017/11/super-h%C3%A9ro-am%C3%A9ricain.jpg'}" alt ="image hero">
   <ul><li class="details">${hero.biography && hero.biography.aliases || hero.aliases}</li>
        <li class="details">${hero.appearance && hero.appearance.gender || hero.gender}</li>
         <li class="details">${hero.appearance && hero.appearance.weight || hero.weight}</li>
         <li class="details">${hero.appearance && hero.appearance.height || hero.height}</li>
        <li class="details">${hero.appearance && hero.appearance.race || hero.race}</li>
         <li class="details">${hero.biography && hero.biography.publisher || hero.publisher}</li>
   </ul> `
    section.appendChild(div);

}

function displayAllHeroes(list) {
    const ul = document.getElementById("listAllHeroes");
    ul.innerHTML = "";
    list.forEach((hero) => {
        const li = document.createElement("li");
        li.classList.add("hero");
        li.setAttribute("data-hero-id", hero.id);
        li.innerHTML = `
        <h3>${hero.name} </h3>
        <div class="buttons">
             <button class="btn remove">remove</button>
             <button class="btn details">details</button>
            </div>`;

        const btnDetails = li.querySelector(".btn.details");
        const btnRemove = li.querySelector(".btn.remove");

        btnDetails.onclick = () => {
            getOneHero(hero.id);
        };

        btnRemove.onclick = () => {
            deleteOneHero(hero.id)
        };
        ul.appendChild(li);
    })

}

getAllHeroes();


formPostHero.querySelector(".btn").onclick = postNewHero;