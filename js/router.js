const apiKey = "d31eb6bba95554da0867103074d5bb27"
const city = "Saint Petersburg"

function cardDataRequest(city) {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    return baseUrl + city[1] + "&appid=" + apiKey + "&units=metric"
}

function imageRequest(iconCode) {
    return "https://openweathermap.org/img/w/" + iconCode + ".png"
}