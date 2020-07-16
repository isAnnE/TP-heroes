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
    // console.log(id);
    try {
      await axios.delete(`${URL}/${id}`);
      removeHero(id);
    } catch (err) {
      console.error(err);
    }
  }


//DOM FUNCTIONS

function removeHero(idHero){
    const suppHero = document.querySelector(`[data-user-id="${idHero}"]`);
    suppHero.remove();
}

function displayOneHero(hero) {
    const section = document.getElementById("modal-container");
    section.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("modal")
    div.innerHTML = `<h2>${hero.name}</h2>
   <img src="${hero.image.url}" alt ="image hero">
   <ul><li class="details">${hero.biography.aliases}</li>
        <li class="details">${hero.appearance.gender}</li>
         <li class="details">${hero.appearance.weight}</li>
         <li class="details">${hero.appearance.height}</li>
        <li class="details">${hero.appearance.race}</li>
         <li class="details">${hero.biography.publisher}</li>
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

        btnRemove.onclick = () =>{
            deleteOneHero(hero.id)
        };
        ul.appendChild(li);
    });

}

getAllHeroes();