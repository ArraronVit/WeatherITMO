
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

    await buildModelFrom(url)

    document.getElementById('big-icon-weather').src = iconUrl
    document.getElementById('big-icon-weather').style.display = "block"
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
    document.getElementById('big-temp').innerHTML = cityTemperature.toString() + "°C"
    document.getElementById('big-temp').style.display = "block"
}

async function setDataCard(city) {

    const url = cardDataRequest(city)
    let val = await buildModelFrom(url)

    if (val != 0) {
        return val
    } else {

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
        return val
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
        diff.forEach(data => addCard(data))
        actualCards = actualCards.concat(diff)
    }
}

navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
    const latitude = position.coords.latitude.toString()
    const longitude = position.coords.longitude.toString()
    const url = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + latitude + "&" + "lon=" + longitude + "&appid=" + apiKey + "&units=metric"

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