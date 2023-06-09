// example API URL to be changed each search
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}&units=imperial


var searchButton = document.getElementById("searchBtn")
var temperature = document.getElementById("temp");
var windSpeed = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var forcastEL = document.getElementById("forcast");

var getVal = () => document.querySelector("input").value;

function getApi(previousSearch) {
    var city = previousSearch;

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7efd1295c0cc0b1c3b635c92e3821a5d&units=imperial";
    fetch(requestUrl)
        .then(function (response) {

            return response.json();

        })
        .then(function (data) {
            console.log(data)
            var humid = (data.main.humidity)
            var temp = (data.main.temp)
            var wind = (data.wind.speed)
            temperature.textContent = "Temp: " + temp + " °F"
            windSpeed.textContent = "Wind: " + wind + " MPH"
            humidity.textContent = "humidity " + humid + " %"
        });
    getApi5Day(city);
}

function getApi5Day(city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7efd1295c0cc0b1c3b635c92e3821a5d&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data)

            // Pulls data from each day at noon
            var generatedForcastCards = "";
            for (var i = 4; i < data.list.length; i = i + 8) {

                var humid = (data.list[i].main.humidity)
                var temp = (data.list[i].main.temp)
                var wind = (data.list[i].wind.speed)

                // displays: Tue May 30, 2023
                var date = dayjs.unix(data.list[i].dt).format("ddd MMM D, YYYY")

                var forcstCard = `<div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${date}</h5>
                    <p class="card-text">Temp: ${temp}° </p>
                    <p class="card-text">Humidity: ${humid} %</p>
                    <p class="card-text">Wind: ${wind} MPH</p>
                </div>
            </div>`;

                generatedForcastCards += forcstCard;
            }

            forcastEL.innerHTML = generatedForcastCards;

        })
}

function createSearchBtn(searchValue) {
    var Btn = document.createElement("button")
    Btn.innerText = searchValue;
    var previousSearchSection = document.getElementById("buttons")
    previousSearchSection.append(Btn)

    Btn.addEventListener("click", () => {
        getApi(searchValue);
    })

}

// render the buttons when the page loads
// 

searchButton.addEventListener("click", function (e) {
    var value = getVal();
    getApi(value);
    createSearchBtn(value);
    // add to search value to storage
})

// call render all search buttons 
