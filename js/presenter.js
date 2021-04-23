async function layoutHeader(cityModel) {

    document.getElementById('big-icon-weather').src = cityModel.iconSrc;
    document.getElementById('big-wind').innerHTML = cityModel.windSpeed + " m/s,  " + cityModel.windDirection;
    document.getElementById('big-clouds').innerHTML = cityModel.cloudiness;
    document.getElementById('big-pressure').innerHTML = cityModel.pressure + " hpa";
    document.getElementById('big-humidity').innerHTML = cityModel.humidity + "%";
    document.getElementById('big-coords').innerHTML = cityModel.coordinates;
    document.getElementById('big-name').innerHTML = cityModel.name;
    document.getElementById('big-temp').innerHTML = cityModel.temperature + "°C";

    document.getElementById('big-name').style.display = "block";
    document.getElementById('big-temp').style.display = "block";
    document.getElementById('big-icon-weather').style.display = "block";
}

async function layoutCard(cityCard, cityModel) {

    cityCard.querySelector("#temp").textContent = cityModel.temperature + "°C";
    cityCard.querySelector("#icon_weather").src = cityModel.iconSrc;
    cityCard.querySelector("#wind").textContent = cityModel.windSpeed + " m/s,  " + currentCityModel.windDirection;
    cityCard.querySelector("#clouds").textContent = cityModel.cloudiness;
    cityCard.querySelector("#pressure").textContent = cityModel.pressure + " hpa";
    cityCard.querySelector("#humidity").textContent = cityModel.humidity + "%";
    cityCard.querySelector("#coords").textContent = cityModel.coordinates;

    cityCard.querySelector("#loadInformCard").style.display = "none";
    cityCard.querySelector("#card-params").style.display = "block";
    cityCard.querySelector("#icon_weather").style.display = "block";
    cityCard.querySelector("#temp").style.display = "block";
}

async function layoutLoader(loading) {

    let bigCardCity = document.getElementById(
        'big-card-city');
    let bigCardParams = document.getElementById(
        'big-card-params');
    let loadInform = document.getElementById(
        'loadInfrorm');

    if (loading) {
        bigCardCity.style.display = 'none';
        bigCardParams.style.display = 'none';
        loadInform.style.display = 'block';

    } else {
        loadInform.style.display = 'none';
        bigCardParams.style.display = 'block';
        bigCardCity.style.display = 'block';
    }
}