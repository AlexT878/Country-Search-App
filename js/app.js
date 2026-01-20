import { getCountryData } from "./service.js";
import { addToHistory } from "./storage.js";
import { addListItem } from "./ui.js";
import { showCountryDetails } from "./ui.js";
import { renderFavorites } from "./ui.js";

const searchForm = document.getElementById("search_form");
const inputText = document.getElementById("country_input");
const countryDetailsList = document.getElementById("details_list");
const errorMsg = document.getElementById("error_msg");
const recentlySearchedCountriesList = document.getElementById("search-history-list");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        showCountryDetails(country, countryDetailsList);
        addToHistory(countryName);
        addListItem(countryName, recentlySearchedCountriesList, false);
    } catch (error)
    {
        console.log(error);
        errorMsg.textContent = "Country not found. Try again";
    }
    
});

document.addEventListener("DOMContentLoaded", () => {
    const countries = JSON.parse(localStorage.getItem("countryHistory")) || [];

    countries.forEach(country => {
        addListItem(country, recentlySearchedCountriesList, true);
    });

    renderFavorites();
}); 
