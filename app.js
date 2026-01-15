const searchButton = document.getElementById("search_button");
const inputText = document.getElementById("country_input");
const countryDetailsList = document.getElementById("details_list");
const errorMsg = document.getElementById("error_msg");

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
    } catch (error)
    {
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
    const capital = country.capital;
    const population = country.population.toLocaleString();
    const currency = Object.values(country.currencies)[0].name;
    const language = Object.values(country.languages)[0];
    const area = country.area.toLocaleString();
    const mapLink = Object.values(country.maps)[0];


    addListItem("Capital: " + capital, countryDetailsList);
    addListItem("Population: " + population, countryDetailsList);
    addListItem("Currency: " + currency, countryDetailsList);
    addListItem("Language: " + language, countryDetailsList);
    addListItem("Area: " + area + ' km²', countryDetailsList);
    addLinkToList("Map: " + mapLink, "Google Maps", countryDetailsList);
}

function addListItem(text, list)
{
    const liElement = document.createElement('li');
    liElement.textContent = text;
    list.append(liElement);
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

// API GET https://restcountries.com/v3.1/all
