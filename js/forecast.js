// Purpose: To get the weather of a city
apikey = "vOl9ukGqpDmgRdseSTbxcAoaY6gJyIbS";

//get city 
const getCity = async (city) => {
    const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const queryParameters = `?apikey=${apikey}&q=${city}`;
    const response = await fetch(baseURL + queryParameters);
    const data = await response.json();
    return data[0];
}
//get weather of city 
const getWeather = async (locationkey) => {
    const baseURL = "http://dataservice.accuweather.com/currentconditions/v1/";
    const queryParameters = `${locationkey}?apikey=${apikey}`;
    const response = await fetch(baseURL + queryParameters);
    const data = await response.json();
    return data[0];
}