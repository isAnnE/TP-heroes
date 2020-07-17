const URL = "http://localhost:8000/heroes";
const formPostHero = document.getElementById("form-post-hero");
const btnSearch = document.getElementById("btnSearch");
const search = document.getElementById("search");

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
            document.getElementById("search").oninput = function (evt) {
                const checkedRadio = document.querySelector("[name=filter]:checked");
                var filterList;
                if (checkedRadio.value === "name") {
                    filterList = letterFilter(heroes, evt.target.value);
                } else {
                    filterList = publisherFilter(heroes, evt.target.value);
                }
                // const filterName = letterFilter(heroes, evt.target.value);
                displayAllHeroes(filterList);
            }
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


//DOM function

//remove hero
function removeHero(idHero) {
    const suppHero = document.querySelector(`[data-user-id="${idHero}"]`);
    suppHero.remove();
}

function letterFilter(heroes, search) {
    return heroes.filter(function (hero) {
        return hero.name.toLowerCase().match(search.toLowerCase());
    })
}

function publisherFilter(heroes, search) {
    return heroes.filter(function (hero) {
        return hero.biography.publisher.toLowerCase().match(search.toLowerCase());
    })
}


//afficher un hero
function displayOneHero(hero) {
    const section = document.getElementById("modal-container");
    section.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("modal")
    div.innerHTML = `<h2>${hero.name}</h2>
    <img src="${hero.image && hero.image.url || 'https://www.stageusa.fr/wp-content/uploads/2017/11/super-h%C3%A9ro-am%C3%A9ricain.jpg'}" alt ="image hero">
   <ul><li class="detail">${hero.biography && hero.biography.aliases || hero.aliases}</li>
        <li class="detail">${hero.appearance && hero.appearance.gender || hero.gender}</li>
         <li class="detail">${hero.appearance && hero.appearance.weight || hero.weight}</li>
         <li class="detail">${hero.appearance && hero.appearance.height || hero.height}</li>
        <li class="detail">${hero.appearance && hero.appearance.race || hero.race}</li>
         <li class="detail">${hero.biography && hero.biography.publisher || hero.publisher}</li>
   </ul>
   <a href="#" aria-label="Close modal" class="fermer"></a> `
    section.appendChild(div);
}


//afficher tout les hero
function displayAllHeroes(list) {
    const ul = document.getElementById("listAllHeroes");
    ul.innerHTML = "";
    list.forEach((hero) => {
        const li = document.createElement("li");
        li.classList.add("hero");
        li.setAttribute("data-user-id", hero.id);
        li.innerHTML = `<h3> ${hero.name} </h3>
        <h4>${hero.biography && hero.biography.publisher || hero.publisher}</h4>
      
        <div class="buttons">
        <button class="btn remove">remove</button>
        <button class="btn details"><a href="#modal-container" aria-label="open navigation">details</a></button>        
        </div> `;

        const btnDetail = li.querySelector(".btn.details")
        const btnRemove = li.querySelector(".btn.remove");
        btnDetail.onclick = () => {
            getOneHero(hero.id)
        }
        btnRemove.onclick = () => {
            deleteOneHero(hero.id);
        };
        ul.appendChild(li);
    })

}



getAllHeroes();

formPostHero.querySelector(".btn").onclick = postNewHero;