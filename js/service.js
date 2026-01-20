const BASE_URL_COUNTRIES_API = "https://restcountries.com/v3.1";

export async function getCountryData(name)
{
    const response = await fetch(`${BASE_URL_COUNTRIES_API}/name/${name}`);
    if(response.ok == false)
    {
        throw new Error("Country not found.")
    }

    const data = await response.json();
    return data[0]; // First country found
}