let Pokemon = document.querySelector("#pokemon").content

let form =document.querySelector(".form")
let pokemonList = document.querySelector(".list")
let searchSelect = document.querySelector(".searchSelect")
let searchInput= document.querySelector(".searchInput")
let sortSelect = document.querySelector(".sortSelect")

let modalOpenBtn = document.querySelector(".heart")

let madal = document.querySelector(".madal")
let bookmarkList = document.querySelector(".bookmark-list")


console.log
let typeArr = []

let bookmarkPocemon = JSON.parse(window.localStorage.getItem("bookmarkPocemon")) || []

let AaZz = (a,b) => {
    if (a.name > b.name) {
        return 1
    }
    if (b.name > a.name) {
        return -1
    }
    return 0
}

let ZzAz = (a,b) => {
    if (b.name > a.name) {
        return -1
    }
    if (b.name > a.name) {
        return 1
    }
    return 0
}
let newOld = (a, b) => {
    return a.birth_date-b.birth_date
}
let oldNew = (a, b) => {
    return b.birth_date-a.birth_date
}

let sortFuntion = {
    0: AaZz,
    1: ZzAz,
    2: newOld,
    3:oldNew
}

function craetePocemon(pocemon) {
    let elPokemon = Pokemon.cloneNode(true)
    
    elPokemon.querySelector(".pokemon-img").src = pocemon.img
    elPokemon.querySelector(".pokemon-name").textContent = pocemon.name
    pocemon.type.forEach(element => {
        let newLi = document.createElement("li")
        newLi.textContent = element
        elPokemon.querySelector(".pokemon-ganres").appendChild(newLi)
        if (!typeArr.includes(element)) {
            typeArr.push(element)
            let newOption = document.createElement("option")
            newOption.textContent = element
            searchSelect.appendChild(newOption)
        }
    });
    elPokemon.querySelector(".pokemon-weight").textContent = pocemon.weight
    elPokemon.querySelector(".pokemon-height").textContent = pocemon.height

    elPokemon.querySelector(".bookmark-love").dataset.id = pocemon.id

    pokemonList.appendChild(elPokemon)

}

pokemons.forEach(element => {
    craetePocemon(element)
});


function searchPokemon(e) {
    e.preventDefault()
    pokemonList.innerHTML = ""

    let foundPokemon

    let searchSelectValue = searchSelect.value
    let searchInputValue = searchInput.value
    let sortSelectValue = sortSelect.value

    let newReg = new RegExp(searchInputValue,"gi")

    
    if (searchSelectValue === "All") {
        foundPokemon = pokemons
    } else {
        
        foundPokemon = pokemons.filter((pokemon) => pokemon.type.includes(searchSelectValue))
    }
    foundPokemon.sort(sortFuntion[sortSelectValue])
    foundPokemon.forEach(element => {
        if (element.name.match(newReg)) {
            craetePocemon(element)
        }
    });

    
    
}

let PocemonBookmark = document.querySelector("#pokemon-bookmark").content

function pocemBookmars(pocemon) {
    let elPocemonBookmark = PocemonBookmark.cloneNode(true)

    elPocemonBookmark.querySelector(".pokemon-bookmark-img").src = pocemon.img
    elPocemonBookmark.querySelector(".pokemon-bookmark-name").textContent = pocemon.name
    pocemon.type.forEach((element) => {
        let newLi = document.createElement("li")
        newLi.textContent = element
        elPocemonBookmark.querySelector(".pokemon-bookmark-ganres").appendChild(newLi)
    })
    elPocemonBookmark.querySelector(".pokemon-bookmark-weight").textContent = pocemon.weight
    elPocemonBookmark.querySelector(".pokemon-bookmark-height").textContent = pocemon.height
    elPocemonBookmark.querySelector(".bosket").dataset.id = pocemon.id

    bookmarkList.appendChild(elPocemonBookmark)
}

form.addEventListener("submit", searchPokemon)


modalOpenBtn.addEventListener("click", function () {
    madal.classList.add("madal-open")

    madal.addEventListener("click", function (evt) {
        if (evt.target.matches(".madal")) {
            madal.classList.remove("madal-open")
        }
    })
})


pokemonList.addEventListener("click", function (evt) {
    if (evt.target.matches(".bookmark-love")) {
        let foundPokemon = pokemons.find((pocemon) => pocemon.id == evt.target.dataset.id)
        if (!bookmarkPocemon.includes(foundPokemon)) {
            bookmarkPocemon.push(foundPokemon)

            window.localStorage.setItem("bookmarkPocemon",JSON.stringify(bookmarkPocemon))
        }
        bookmarkList.innerHTML = " "
        bookmarkPocemon.forEach(element => {
            pocemBookmars(element)
        });
    }
})

bookmarkPocemon.forEach(element => {
    pocemBookmars(element)
});

bookmarkList.addEventListener("click", function (evt) {
    if (evt.target.matches(".bosket")) {
        let foudIndex = bookmarkPocemon.findIndex(film => film.id == evt.target.dataset.id)
        bookmarkPocemon.splice(foudIndex, 1)
        
        bookmarkList.innerHTML = ""


        bookmarkPocemon.forEach(element => {
            pocemBookmars(element)
        });
        window.localStorage.setItem("bookmarkPocemon",JSON.stringify(bookmarkPocemon))

    }
})