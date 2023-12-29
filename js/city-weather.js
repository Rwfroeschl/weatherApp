
const cityForm = document.querySelector("form");

//update city
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const cityWeather = await getWeather(cityDetails.Key);
    return { cityDetails, cityWeather };
};

//load city form local storage
if (localStorage.getItem("weatherCity")) {
    updateCity(localStorage.getItem("weatherCity"))
        .then((data) => updateUI(data))
        .catch(err => console.log(err));
}

//get city from user 
cityForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    localStorage.setItem("weatherCity", city);

    updateCity(city)
        .then((data) => updateUI(data))
        .catch(err => {
            alert("Something went wrong while getting the weather of the city");
            console.log(err);
            throw new Error("Please enter a valid city name");
        });
});
// update UI 
const card = document.querySelector(".card");

const updateUI = (data) => {
    const { cityDetails, cityWeather } = data;
    card.innerHTML = 
    `   <div class="card">
            <div class ="card-img-top"> </div>
            <div class="weather-details">
                <h4 class="my-1">${cityDetails.EnglishName}</h4>
                <h5 class="my-1">${cityDetails.AdministrativeArea.EnglishName}</h5>
                <h6>${cityDetails.Country.EnglishName}</h6>
                <div class="weather-text">
                    <div class="mt-3">${cityWeather.WeatherText}</div>
                    <div class="display-4 my-2">
                        <span>${cityWeather.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                    </div>
                </div>
            </div>
        </div>
        `;
};