import { isCountryFavorite } from "./storage.js";
import { addToFavorites } from "./storage.js";

const historyList = document.getElementById("search-history-list");
const favoritesLists = document.getElementById("favorites_lists");

export function addListItem(text, list, end)
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

export function showCountryDetails(country, list)
{
    const flagUrl = country.flags.svg;
    const capital = country.capital;
    const population = country.population.toLocaleString();
    const currency = Object.values(country.currencies)[0].name;
    const language = Object.values(country.languages)[0];
    const area = country.area.toLocaleString();
    const mapLink = Object.values(country.maps)[0];

    addFlagImage(flagUrl, list);
    addListItem("Capital: " + capital, list, true);
    addListItem("Population: " + population, list, true);
    addListItem("Currency: " + currency, list, true);
    addListItem("Language: " + language, list, true);
    addListItem("Area: " + area + ' km²', list, true);
    addLinkToList("Map: " + mapLink, "Google Maps", list, true);
    renderFavoriteButton(country, list);
}

function renderFavoriteButton(country, list)
{
    const countryName = country.name.common;
    const template = document.getElementById('star-template');
    const starClone = template.content.cloneNode(true);
    const favoritesButton = starClone.querySelector('.star-btn');

    if (isCountryFavorite(countryName)) 
    {
        favoritesButton.classList.add('active');
    }

    favoritesButton.addEventListener("click", () => {
        if(addToFavorites(country))
        {
            favoritesButton.classList.remove('active');
        }
        else
        {
            favoritesButton.classList.add('active');
        }
        renderFavorites();
    })
    
    list.append(favoritesButton);
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

export function renderFavorites()
{
    const favoritesData = JSON.parse(localStorage.getItem("countryFavorites")) || [];

    favoritesLists.innerHTML = "";

    if (favoritesData.length === 0) {
        favoritesLists.innerHTML = "List is empty";
        return;
    }

    favoritesData.forEach(country => {
        const span = document.createElement("span");
        const img = document.createElement("img");
        span.textContent = country.name;
        img.src = country.url;
        img.classList.add("country-flag-favorites"); 
        favoritesLists.appendChild(span);
        favoritesLists.appendChild(img);
    });
}

export function renderHistory()
{
    const historyData = JSON.parse(localStorage.getItem("countryHistory")) || [];

    historyList.innerHTML = "";

    if(historyData.length == 0)
    {
        historyList.innerHTML="";
        return;
    }

    historyData.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        historyList.append(li);
    })
}