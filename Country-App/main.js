import { countries } from "./countries.js";
const countryInput = document.getElementById("country-input");
const inputBtn = document.getElementById("input-btn");
const countrySection = document.querySelector("#country-section");

const apiUrl = "https://restcountries.com/v3.1/all";

console.log(apiUrl);

const getApiData = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

getApiData().then((allCountryData) => {
  console.log(allCountryData);
});

const showCountryInfo = async () => {
  const inputName = countryInput.value.toLowerCase();
  const allCountryData = await getApiData();

  try {
    countrySection.innerHTML = "";

    allCountryData.forEach((countryInfo) => {
      const countryName = countryInfo.name.common.toLowerCase();
      const countryCapital = countryInfo.capital;
      const countryContinent = countryInfo.region;
      const countryFlag = countryInfo.flags.png;
      const countryLanguages = countryInfo.languages
        ? Object.values(countryInfo.languages).join(", ")
        : "N/A";
      const countryPopulation = countryInfo.population;

      if (countryName.includes(inputName)) {
        const flagDisplay = document.createElement("img");
        flagDisplay.src = countryFlag;
        countrySection.appendChild(flagDisplay);

        const nameDisplay = document.createElement("h2");
        nameDisplay.innerHTML = `${countryInfo.name.common}`;
        countrySection.appendChild(nameDisplay);

        const capitalDisplay = document.createElement("h4");
        capitalDisplay.innerHTML = `Capital: ${countryCapital}`;
        countrySection.appendChild(capitalDisplay);

        const continetDisplay = document.createElement("h4");
        continetDisplay.innerHTML = `Continent: ${countryContinent}`;
        countrySection.appendChild(continetDisplay);

        const languageDisplay = document.createElement("p");
        languageDisplay.innerHTML = `Spoken language'(s): ${countryLanguages}`;
        countrySection.appendChild(languageDisplay);

        const populationDisplay = document.createElement("p");
        populationDisplay.innerHTML = `Population: ${countryPopulation}`;
        countrySection.appendChild(populationDisplay);
      }
    });
  } catch (error) {
    console.error("Data not fetching or displaying", error);
  }
};

// Function to filter countries based on user input
const filterCountries = (input) => {
  return countries.filter((country) =>
    country.toLowerCase().includes(input.toLowerCase())
  );
};

const updateSuggestions = (inputValue) => {
  const suggestionsContainer = document.getElementById("suggestions-container");
  suggestionsContainer.innerHTML = ""; // Clear previous suggestions

  const suggestions = filterCountries(inputValue);

  // Display suggestions in the suggestions container
  suggestions.forEach((suggestion) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.textContent = suggestion;

    suggestionItem.addEventListener("click", () => {
      // When a suggestion is clicked, populate the input field
      countryInput.value = suggestion;
      suggestionsContainer.style.display = "none"; // Hide suggestions
      showCountryInfo(inputValue);
    });

    suggestionsContainer.appendChild(suggestionItem);
  });

  // Show or hide the suggestions container based on the number of suggestions
  suggestionsContainer.style.display =
    suggestions.length > 0 ? "block" : "none";
};

countryInput.addEventListener("input", function () {
  const inputValue = this.value;
  updateSuggestions(inputValue);
});

inputBtn.addEventListener("click", function () {
  showCountryInfo(countryInput.value);
});
