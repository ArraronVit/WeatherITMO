
let isLoaded = false

async function setDataHead(url) {

    await layoutLoader(true);
    await buildModelFrom(url);
    await layoutHeader(currentCityModel);
    await layoutLoader(false);
}

async function setDataCard(city) {

    const url = cardDataRequest(city);
    const result = await buildModelFrom(url);

    if (result != 0) {
        return result;
    } else {
        const cityCard = document.getElementById(city[0]);
        await layoutCard(cityCard, currentCityModel);
        await saveCityToFavourites(city);
        return result;
    }
}

async function getCurrent() {
    if (!isLoaded) {
        const data = await getFavourites();
        for (const city of data) {
            await addCard(city);
        }
        isLoaded = true
    }
}

navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
    const url = currentLocationRequest(position);
    await setDataHead(url);
    await getCurrent();
}

async function error(err) {
    if (err.PERMISSION_DENIED) {
        const url = defaultRequest();
        await setDataHead(url);
    }
}