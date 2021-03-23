
let actualCards = [];

async function setDataHead(url) {

    await layoutLoader(true);
    await buildModelFrom(url);
    await layoutHeader(cityModel);
    await layoutLoader(false);
}

async function setDataCard(city) {

    const url = cardDataRequest(city);
    const val = await buildModelFrom(url);

    if (val != 0) {
        return val;
    } else {
        const cityCard = document.getElementById(city[0]);
        await layoutCard(cityCard);
        return val;
    }
}

function updateLocalStorage() {
    if (localStorage.getItem("cities") !== null) {
        const cards = JSON.parse(localStorage["cities"]);

        let diff = [];
        for (const item1 of cards) {
            let flag = true;
            for (const item of actualCards) {
                if (item1[0] === item[0]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                diff.push(item1);
            }
        }
        diff.forEach(data => addCard(data));
        actualCards = actualCards.concat(diff);
    }
}

navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
    const url = currentLocationRequest(position);
    await setDataHead(url);
    updateLocalStorage();
}

async function error(err) {
    if (err.PERMISSION_DENIED) {
        const url = defaultRequest();
        await setDataHead(url);
        updateLocalStorage();
    }
}