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
        city.temperature = Math.round(response.main.temp);
        city.iconSrc = imageRequest(response.weather[0].icon);
        city.windSpeed = response.wind.speed;
        city.windDirection = CityModel.getWindDirection(response.wind.deg);
        city.cloudiness = response.clouds.all;
        city.pressure = response.main.pressure;
        city.humidity = response.main.humidity;
        city.locationLat = response.coord.lat;
        city.locationLon = response.coord.lon;
        city.coordinates = "[" + city.locationLat.toString() + ", " + city.locationLon.toString() + "]";

        return city;
    }

    static getWindDirection(deg) {
        if (deg > 337.5) {
            return "North";
        }
        if (deg > 292.5) {
            return "North-west";
        }
        if (deg > 247.5) {
            return "West";
        }
        if (deg > 202.5) {
            return "South-west";
        }
        if (deg > 157.5) {
            return "South";
        }
        if (deg > 122.5) {
            return "South-east";
        }
        if (deg > 67.5) {
            return "East";
        }
        if (deg > 22.5) {
            return "North-east";
        }
        return "North";
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
            if (model.name == currentCityModel.name) {
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

