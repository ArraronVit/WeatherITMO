const apiKey = "d31eb6bba95554da0867103074d5bb27";
const city = "Saint Petersburg";
const headers = "&appid=" + apiKey + "&units=metric"

function cardDataRequest(city) {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    return baseUrl + city[1] + headers;
}

function imageRequest(iconCode) {
    return "https://openweathermap.org/img/w/" + iconCode + ".png";
}

function currentLocationRequest(position) {
    const latitude = "lat=" + position.coords.latitude.toString();
    const longitude = "lon=" + position.coords.longitude.toString();
    return "https://api.openweathermap.org/data/2.5/weather?" + latitude + "&" + longitude + headers
}

function defaultRequest() {
    return "https://api.openweathermap.org/data/2.5/weather?q=" + city + headers
}