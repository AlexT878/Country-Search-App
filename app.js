const searchButton = document.getElementById("search_button");
const inputText = document.getElementById("country_input");
const countryDetailsList = document.getElementById("details_list");
const errorMsg = document.getElementById("error_msg");
const recentlySearchedCountriesList = document.getElementById("recentlySearchedCountries_list");

searchButton.addEventListener("click", async () => {
    const countryName = inputText.value.trim(); // Trim to remove extra spaces

    errorMsg.textContent = "";
    countryDetailsList.textContent = "";
    if(countryName == "")
    {
        errorMsg.textContent = "Enter a country name!";
        return;
    }

    try {
        errorMsg.textContent = "Loading...";
        const country = await getCountryData(countryName);
        errorMsg.textContent = "";
        showCountryDetails(country);
        addToHistory(countryName);
    } catch (error)
    {
        console.log(error);
        errorMsg.textContent = "Country not found. Try again";
    }
    
});

async function getCountryData(name)
{
    const response = await fetch("https://restcountries.com/v3.1/name/" + name);
    if(response.ok == false)
    {
        errorMsg.textContent = "Country not found. Try again";
        return;
    }

    const data = await response.json();
    return data[0]; // First country found
}

function showCountryDetails(country)
{
    const flagUrl = country.flags.svg;
    const capital = country.capital;
    const population = country.population.toLocaleString();
    const currency = Object.values(country.currencies)[0].name;
    const language = Object.values(country.languages)[0];
    const area = country.area.toLocaleString();
    const mapLink = Object.values(country.maps)[0];

    addFlagImage(flagUrl, countryDetailsList);
    addListItem("Capital: " + capital, countryDetailsList, true);
    addListItem("Population: " + population, countryDetailsList, true);
    addListItem("Currency: " + currency, countryDetailsList, true);
    addListItem("Language: " + language, countryDetailsList, true);
    addListItem("Area: " + area + ' km²', countryDetailsList, true);
    addLinkToList("Map: " + mapLink, "Google Maps", countryDetailsList, true);
}

function addFlagImage(url, list)
{
    const liElement = document.createElement('li');
    liElement.classList.add('flag-container');
    const img = document.createElement('img');
    img.src = url;
    img.classList.add("country-flag"); // CSS class for the image itself

    liElement.append(img);
    list.append(liElement);
}

function addListItem(text, list, end)
{
    const liElement = document.createElement('li');
    liElement.textContent = text;
    if(end)
    {
        list.append(liElement);
    }
    else
    {
        list.prepend(liElement);
    }
}

function addLinkToList(link, text, list)
{
    const liLink = document.createElement('a');
    const liElement = document.createElement('li');
    liLink.href = link;
    liLink.textContent = text;
    liLink.target="_blank";
    liElement.append(liLink);
    list.append(liElement);
}

document.addEventListener("DOMContentLoaded", () => {
    const countries = JSON.parse(localStorage.getItem("countryHistory")) || [];

    countries.forEach(country => {
        let newListElement = document.createElement('li');
        newListElement.textContent = country;
        recentlySearchedCountriesList.append(newListElement);
    });
}); 

function addToHistory(name)
{
    let historyData = JSON.parse(localStorage.getItem("countryHistory")) || []; // Empty array if there is no country

    historyData.unshift(name);

    if(historyData.length > 10)
    {
        historyData = historyData.slice(0, 10);
    }
    console.log(JSON.stringify(historyData))
    localStorage.setItem("countryHistory", JSON.stringify(historyData));
    addListItem(name, recentlySearchedCountriesList, false);
}

// API GET https://restcountries.com/v3.1/all
