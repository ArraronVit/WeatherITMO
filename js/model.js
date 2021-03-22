
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
let cityModel = null;
let models = [];

async function buildModelFrom(url) {
    flag = 0;
    let response = await fetch(url)
        try {
            let city = await response.json();
            cityModel = CityModel.buildModel(city);
            for (let i=0; i < models.length; ++i) {
                if (models[i].name == cityModel.name) {
                    alert(cityModel.name + " already in your favourites!");
                    flag = 1;
                    return flag;
                }
            }
            models.push(cityModel);
            return flag;

        } catch (error) {
            alert("Request error! Try to refresh the page.");
            flag = 1;
            return flag;
        }
}

