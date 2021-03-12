const apiKey = "d31eb6bba95554da0867103074d5bb27"
const city = "Saint Petersburg"
const lat = "lat="
const lon = "lon="

let actualCards = []

async function setDataHead(url) {
    let big_card_city = document.getElementById(
        'big-card-city')
    let big_card_params = document.getElementById(
        'big-card-params')
    let loadInform = document.getElementById(
        'loadInfrorm')
    big_card_city.style.display = 'none'
    big_card_params.style.display = 'none'
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

    let city_name = json.name
    let city_temp = Math.round(json.main.temp)

    let iconCode = json.weather[0].icon
    let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"
    console.log(iconUrl)
    document.getElementById('big-icon-weather').src = iconUrl
    document.getElementById('big-icon-weather').style.display = "block"

    let latCoord = json.coord.lat
    let lonCoord = json.coord.lon
    let coords = "[" + latCoord.toString() + ", " +
        lonCoord.toString() + "]"
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

    big_card_params.style.display = 'block'

    document.getElementById('big-name').innerHTML = city_name.toString()
    document.getElementById('big-name').style.display = "block"
    document.getElementById('big-temp').innerHTML = city_temp.toString() + "°C"
    document.getElementById('big-temp').style.display = "block"
    big_card_city.style.display = 'block'
}

async function success(position) {
    console.log("success")

    const latitude = position.coords.latitude.toString()
    const longitude = position.coords.longitude.toString()
    const url = "https://api.openweathermap.org/data/2.5/weather?" + lat + latitude + "&" + lon + longitude + "&appid=" + apiKey + "&units=metric"

    await setDataHead(url)

    checkLocalStorage()
}

async function error(err) {
    if (err.PERMISSION_DENIED) {
        console.log("access denied")

        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric"

        await setDataHead(url)
        checkLocalStorage()
    }
}

function checkLocalStorage() {
    if (localStorage.getItem("cities") !== null) {
        const cards = JSON.parse(localStorage["cities"])
        console.log(actualCards)
        let diff = []
        for (let i = 0; i < cards.length; ++i) {
            let flag = true
            for (let j = 0; j < actualCards.length; ++j) {
                if (cards[i]["0"] === actualCards[j]["0"]) {
                    flag = false
                    break
                }
            }
            if (flag === true) {
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
    let t = new_card.content.cloneNode(true)
    const td = t.querySelector("#city-name")
    td.textContent = city["1"]
    const idCard = city["0"]
    const idt = t.querySelector("#card")
    idt.id = idCard.toString()
    const idd = t.querySelector("#delete")
    idd.id += idCard.toString()
    const tb = document.getElementById("list-cards")
    const clone = document.importNode(t, true)
    tb.prepend(clone)
    return setDataCard(city)
}

async function clickAdd(event) {
    const city = [Date.now(), event.target.querySelector("#add-city-name").value]
    let result = await addCard(city)
    console.log(result)
    if (result === 0) {
        let cards = [];
        if (localStorage.getItem("cities") !== null) {
            cards = JSON.parse(localStorage["cities"])
        }
        cards.push(city)
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
    actualCards = cards.filter(item => item["0"] !== idCard)
    localStorage.setItem("cities", JSON.stringify(actualCards))
    obj.parentElement.parentElement.remove()
}

function deleteItemByCity(city) {
    let idCard = city[0]
    let obj = document.getElementById(idCard)
    obj.remove()

}

async function setDataCard(city) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city["1"] + "&appid=" + apiKey + "&units=metric"
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

    let city_temp = Math.round(json.main.temp)

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

    let cityCard = document.getElementById(city["0"])

    const cityTemp = cityCard.querySelector("#temp")
    cityTemp.textContent = city_temp.toString() + "°C"
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
