const city = "Saint Petersburg";

function cardDataRequest(city) {
    const baseUrl = "https://ancient-beyond-40342.herokuapp.com/weather/city?q="

    return baseUrl + city
}

function imageRequest(iconCode) {
    return iconCode;
}

function currentLocationRequest(position) {
    const latitude = "lat=" + position.coords.latitude.toString();
    const longitude = "lon=" + position.coords.longitude.toString();

    return "https://ancient-beyond-40342.herokuapp.com/weather/coordinates?" + latitude + "&" + longitude
}

function defaultRequest() {
    const baseUrl = "https://ancient-beyond-40342.herokuapp.com/weather/city?q="
    return baseUrl + city
}

