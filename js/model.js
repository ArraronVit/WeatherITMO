let latCoord = ""
let lonCoord = ""
let coords = ""
let wind = ""
let clouds = ""
let pressure = ""
let humidity = ""
let cityTemperature = ""
let iconCode = ""
let cityName = ""
let iconUrl = ""
let flag = 0

async function buildModelFrom(url) {
    flag = 0
    let json = await fetch(url).then(function (resp) {
        if (!resp.ok) {
            throw new Error()
        }
        return resp.json()
    })
        .catch(function () {
            alert("Request error! Try to refresh the page.")
            flag = 1
        })
    if (flag === 1) {
        return 1
    }
    latCoord = json.coord.lat
    lonCoord = json.coord.lon
    coords = "[" + latCoord.toString() + ", " + lonCoord.toString() + "]"
    wind = json.wind.speed
    clouds = json.clouds.all
    pressure = json.main.pressure
    humidity = json.main.humidity
    cityTemperature = Math.round(json.main.temp)
    iconCode = json.weather[0].icon
    cityName = json.name
    iconUrl = imageRequest(iconCode)
    return 0
}

