async function addCard(city) {
    let newCard = new_card.content.cloneNode(true);
    const cityName = newCard.querySelector("#city-name");
    cityName.textContent = city;
    const idCard = city[0];
    const card = newCard.querySelector("#card");
    card.id = idCard.toString();
    const deleteCard = newCard.querySelector("#delete");
    deleteCard.id += idCard.toString();
    const cardsList = document.getElementById("list-cards");
    const clone = document.importNode(newCard, true);
    cardsList.prepend(clone);

    return setDataCard(city);
}

async function clickAdd(event) {
    const city = [event.target.querySelector("#add-city-name").value];
    const result = await addCard(city);
    if (result != 0) {
        deleteItemByCity(city);
    }
}

async function clickDelete(obj) {
    await notifyModels(obj);
    obj.parentElement.parentElement.remove();
}

async function notifyModels(obj) {
    const city = obj.parentElement.parentElement.querySelector("#city-name").textContent;
    await deleteCityFromFavourites(city)
}

function deleteItemByCity(city) {
    const idCard = city[0];
    let obj = document.getElementById(idCard);
    obj.remove();
}

window.onload = function () {
    const add_card = document.getElementById("add_card");
    add_card.addEventListener("submit", function (event) {
        event.preventDefault();
        clickAdd(event).then();
        event.target.querySelector("#add-city-name").value = "";
    }, false);
}
