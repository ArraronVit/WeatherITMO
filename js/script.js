const apiKey = "d31eb6bba95554da0867103074d5bb27"
const city = "Saint Petersburg"
const lat = "lat="
const lon = "lon="

let actualCards = []

async function setDataHead(url) {
    let bigCardCity = document.getElementById(
        'big-card-city')
    let bigCardParams = document.getElementById(
        'big-card-params')
    let loadInform = document.getElementById(
        'loadInfrorm')
    bigCardCity.style.display = 'none'
    bigCardParams.style.display = 'none'
    loadInform.style.display = 'block'

    let json = await fetch(url).then(function (resp) {
        if (!resp.ok) {
            throw new Error()
        }
        return resp.json()
    })
        .catch(function () {
            alert("Ошибка при выполнении запроса! Попробуйте обновить страницу")
        })

    let cityName = json.name
    let cityTemp = Math.round(json.main.temp)

    let iconCode = json.weather[0].icon
    let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"
    console.log(iconUrl)
    document.getElementById('big-icon-weather').src = iconUrl
    document.getElementById('big-icon-weather').style.display = "block"

    let latCoord = json.coord.lat
    let lonCoord = json.coord.lon
    let coords = "[" + latCoord.toString() + ", " + lonCoord.toString() + "]"
    let wind = json.wind.speed
    let clouds = json.clouds.all
    let pressure = json.main.pressure
    let humidity = json.main.humidity

    document.getElementById('big-wind').innerHTML = wind.toString() + " m/s"
    document.getElementById('big-clouds').innerHTML = clouds.toString() + "%"
    document.getElementById('big-pressure').innerHTML = pressure.toString() + " hpa"
    document.getElementById('big-humidity').innerHTML = humidity.toString() + "%"
    document.getElementById('big-coords').innerHTML = coords

    loadInform.style.display = 'none'
    bigCardParams.style.display = 'block'
    bigCardCity.style.display = 'block'

    document.getElementById('big-name').innerHTML = cityName.toString()
    document.getElementById('big-name').style.display = "block"
    document.getElementById('big-temp').innerHTML = cityTemp.toString() + "°C"
    document.getElementById('big-temp').style.display = "block"

}

async function success(position) {
    const latitude = position.coords.latitude.toString()
    const longitude = position.coords.longitude.toString()
    const url = "https://api.openweathermap.org/data/2.5/weather?" + lat + latitude + "&" + lon + longitude + "&appid=" + apiKey + "&units=metric"

    await setDataHead(url)

    updateLocalStorage()
}

async function error(err) {
    if (err.PERMISSION_DENIED) {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric"

        await setDataHead(url)

        updateLocalStorage()
    }
}

function updateLocalStorage() {
    if (localStorage.getItem("cities") !== null) {
        const cards = JSON.parse(localStorage["cities"])
        console.log(actualCards)
        let diff = []
        for (let i = 0; i < cards.length; ++i) {
            let flag = true
            for (let j = 0; j < actualCards.length; ++j) {
                if (cards[i][0] === actualCards[j][0]) {
                    flag = false
                    break
                }
            }
            if (flag) {
                diff.push(cards[i])
            }
        }
        console.log(diff)
        diff.forEach(data => addCard(data))
        console.log(diff)
        actualCards = actualCards.concat(diff)
        console.log(actualCards)
    }
}

navigator.geolocation.getCurrentPosition(success, error);

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
    for (let i=0; i < actualCards.length; ++i) {
       let card = actualCards[i]
       if (city[1] == card[1]) {
           alert(city[1] + " already in your favourites!")
           return
       }
    }
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
    actualCards = cards.filter(item => item["0"] != idCard)
    localStorage.setItem("cities", JSON.stringify(actualCards))
    obj.parentElement.parentElement.remove()
}

function deleteItemByCity(city) {
    let idCard = city[0]
    let obj = document.getElementById(idCard)
    obj.remove()
}

async function setDataCard(city) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city[1] + "&appid=" + apiKey + "&units=metric"
    let flag = 0

    let json = await fetch(url).then(function (resp) {
        console.log(resp)
        if (!resp.ok) {
            throw new Error()
        }
        return resp.json()
    })
        .catch(function () {
            alert("Ошибка при выполнении запроса! Попробуйте ввести название города снова")
            flag = 1
        })

    if (flag === 1) {
        return 1
    }
    console.log(json)
    let cityTemperature = Math.round(json.main.temp)

    let iconCode = json.weather[0].icon
    let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"

    let latCoord = json.coord.lat
    let lonCoord = json.coord.lon
    let coords = "[" + latCoord.toString() + ", " +
        lonCoord.toString() + "]"
    let wind = json.wind.speed
    let clouds = json.clouds.all
    let pressure = json.main.pressure
    let humidity = json.main.humidity

    let cityCard = document.getElementById(city[0])

    const cityTemp = cityCard.querySelector("#temp")
    cityTemp.textContent = cityTemperature.toString() + "°C"
    const cityIcon = cityCard.querySelector("#icon_weather")
    cityIcon.src = iconUrl
    const cityWind = cityCard.querySelector("#wind")
    cityWind.textContent = wind.toString() + " m/s"
    const cityClouds = cityCard.querySelector("#clouds")
    cityClouds.textContent = clouds.toString() + "%"
    const cityPressure = cityCard.querySelector("#pressure")
    cityPressure.textContent = pressure.toString() + " hpa"
    const cityHumidity = cityCard.querySelector("#humidity")
    cityHumidity.textContent = humidity.toString() + "%"
    const cityCoords = cityCard.querySelector("#coords")
    cityCoords.textContent = coords

    cityCard.querySelector("#loadInformCard").style.display = "none"
    cityCard.querySelector("#card-params").style.display = "block"
    cityCard.querySelector("#icon_weather").style.display = "block"
    cityCard.querySelector("#temp").style.display = "block"
    return 0
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
