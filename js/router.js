const city = "Saint Petersburg";

function cardDataRequest(city) {
    // const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    // return baseUrl + city[1] + headers;
    console.log(city)
    const baseUrl = "http://localhost:3000/weather/city?q="
    return baseUrl + city
}

function imageRequest(iconCode) {
    return iconCode;
}

function currentLocationRequest(position) {
    const latitude = "lat=" + position.coords.latitude.toString();
    const longitude = "lon=" + position.coords.longitude.toString();
    // return "https://api.openweathermap.org/data/2.5/weather?" + latitude + "&" + longitude + headers;
    return "http://localhost:3000/weather/coordinates?" + latitude + "&" + longitude
}

function defaultRequest() {
    // return "https://api.openweathermap.org/data/2.5/weather?q=" + city + headers;
    const baseUrl = "http://localhost:3000/weather/city?q="
    return baseUrl + city
}

