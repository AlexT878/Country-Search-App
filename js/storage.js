export function addToHistory(name)
{
    let historyData = JSON.parse(localStorage.getItem("countryHistory")) || []; // Empty array if there is no country

    let index = historyData.indexOf(name);
    if(index > -1)
    {
        console.log(index);
        let temp = historyData[index];
        historyData[index] = historyData[0];
        historyData[0] = temp;
    }
    else
    {
        historyData.unshift(name);
        if(historyData.length > 10)
        {
            historyData = historyData.slice(0, 10);
        }
    }
    console.log(JSON.stringify(historyData))
    localStorage.setItem("countryHistory", JSON.stringify(historyData));
}

export function addToFavorites(country)
{
    let name = country.name.common;
    let favoritesData = JSON.parse(localStorage.getItem("countryFavorites")) || [];
    let flag = false;

    const item = {
        url: country.flags.svg,
        name: name
    }

    if (isCountryFavorite(name)) {
        favoritesData = favoritesData.filter(item => item.name !== name);
        flag = true;
    } else {
        favoritesData.unshift(item);
    }

    localStorage.setItem("countryFavorites", JSON.stringify(favoritesData));
    
    return flag;
}

export function isCountryFavorite(name) {
    const favoritesData = JSON.parse(localStorage.getItem("countryFavorites")) || [];
    return favoritesData.some(country => country.name === name);
}