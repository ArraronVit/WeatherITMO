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

async function saveCityToFavourites(fullCityName) {
    console.log(fullCityName + "Heeeeeereee")
    const url = `https://ancient-beyond-40342.herokuapp.com/favourites?city=${fullCityName}`;

    return await fetch(url, {
        method: "POST"
    });
}

async function deleteCityFromFavourites(fullCityName) {
    const url = `https://ancient-beyond-40342.herokuapp.com/favourites?city=${fullCityName}`;
    console.log(url)
    let response = await fetch(url, {
        method: "DELETE"
    });
}

async function getFavourites() {
    const url = `https://ancient-beyond-40342.herokuapp.com/favourites`;
    const favourites = [];

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        for (let i = 0; i < json.length; i++) {
            favourites[i] = json[i].city;
        }
        return favourites;
    } else {
        return response.status;
    }
}
