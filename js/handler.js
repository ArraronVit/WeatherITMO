async function addCard(city) {
    let newCard = new_card.content.cloneNode(true)
    const cityName = newCard.querySelector("#city-name")
    cityName.textContent = city[1]
    const idCard = city[0]
    const card = newCard.querySelector("#card")
    card.id = idCard.toString()
    const deleteCard = newCard.querySelector("#delete")
    deleteCard.id += idCard.toString()
    const cardsList = document.getElementById("list-cards")
    const clone = document.importNode(newCard, true)
    cardsList.prepend(clone)

    return setDataCard(city)
}

async function clickAdd(event) {
    const city = [Date.now(), event.target.querySelector("#add-city-name").value]
    let result = await addCard(city)
    if (result === 0) {
        actualCards.push(city)
        localStorage.setItem("cities", JSON.stringify(actualCards))
    } else {
        deleteItemByCity(city)
    }
}

function deleteItem(obj) {
    let idCard = obj.parentElement.parentElement.id
    let cards
    if (localStorage.getItem("cities") !== null) {
        cards = JSON.parse(localStorage["cities"])
    }
    actualCards = cards.filter(item => item[0] != idCard)
    localStorage.setItem("cities", JSON.stringify(actualCards))
    obj.parentElement.parentElement.remove()
}

function deleteItemByCity(city) {
    let idCard = city[0]
    let obj = document.getElementById(idCard)
    obj.remove()
}

window.onload = function () {
    const add_card = document.getElementById("add_card")
    console.log(add_card)
    add_card.addEventListener("submit", function (event) {
        event.preventDefault()
        clickAdd(event).then()
        event.target.querySelector("#add-city-name").value = ""
    }, false)
}
