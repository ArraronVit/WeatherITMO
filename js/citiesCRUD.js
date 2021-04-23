async function saveCityToFavourites(fullCityName) {
    const url = `https://ancient-beyond-40342.herokuapp.com/favourites?city=${fullCityName}`;
    try {
        await fetch(url, {
            method: "POST"
        });
    } catch (err) {
        console.log(err)
    }
}

async function deleteCityFromFavourites(fullCityName) {
    const url = `https://ancient-beyond-40342.herokuapp.com/favourites?city=${fullCityName}`;

    await fetch(url, {
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