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
      const countryLanguages = countryInfo.languages;

      if (countryName.includes(inputName)) {
        const flagDisplay = document.createElement("img");
        countrySection.appendChild(flagDisplay);

        const nameDisplay = document.createElement("h2");
        nameDisplay.innerHTML = `Country Name: ${countryInfo.name.common}`;
        countrySection.appendChild(nameDisplay);

        const capitalDisplay = document.createElement("h4");
        capitalDisplay.innerHTML = `Capital: ${countryCapital}`;
        countrySection.appendChild(capitalDisplay);
      }
    });
  } catch (error) {
    console.error("Data not fetching or displaying", error);
  }
};

inputBtn.addEventListener("click", showCountryInfo);