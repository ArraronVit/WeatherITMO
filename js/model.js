class CityModel {
    name;
    temperature;
    iconSrc;
    windSpeed;
    windDirection;
    cloudiness;
    pressure;
    humidity;
    locationLat;
    locationLon;
    coordinates;

    static buildModel(response) {
        let city = new CityModel();

        city.name = response.name;
        city.temperature = Math.round(response.temperature);
        city.iconSrc = imageRequest(response.icon);
        city.windSpeed = response.windSpeed;
        city.windDirection = response.windDirection;
        city.cloudiness = response.cloudiness;
        city.pressure = response.pressure;
        city.humidity = response.humidity;
        city.locationLat = response.latitude;
        city.locationLon = response.longitude;
        city.coordinates = "[" + city.locationLat.toString() + ", " + city.locationLon.toString() + "]";

        return city;
    }
}

let flag = 0;
let currentCityModel = null;
let cityModels = [];

async function buildModelFrom(url) {
    flag = 0;
    const response = await fetch(url);
    try {
        const city = await response.json();
        currentCityModel = CityModel.buildModel(city);
        for (const model of cityModels) {
            if (model.coordinates == currentCityModel.coordinates) {
                if (model.name != cityModels[0].name) {
                    alert(currentCityModel.name + " already in your favourites!");
                }
                flag = 1;
                return flag;
            }
        }
        cityModels.push(currentCityModel);
        return flag;

    } catch (error) {
        alert("Request error! Maybe entered city name is incorrect.");
        flag = 1;
        return flag;
    }
}
