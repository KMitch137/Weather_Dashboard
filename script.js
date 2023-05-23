// example API URL to be changed each search
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}&units=imperial


var searchButton = document.getElementById("searchBtn")
var temperature = document.getElementById("temp");
var windSpeed = document.getElementById("wind");
var humidity = document.getElementById("humidity");

function getVal() {
    var val = document.querySelector("input").value.trim();
    // console.log(val);
    return val
}

function getApi() {
    var city = getVal()
    // console.log(city)
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7efd1295c0cc0b1c3b635c92e3821a5d&units=imperial";

    fetch(requestUrl)
        .then(function (response) {
            // console.log(response)
            return response.json();

        })
        .then(function (data) {
            // console.log(data)
            let humid = (data.main.humidity)
            let temp = (data.main.temp)
            let wind = (data.wind.speed)
            temperature.textContent = "Temp: " + temp + " *F"
            windSpeed.textContent = "Wind: " + wind + " MPH"
            humidity.textContent = "humidity " + humid + " %"
        });
    getApi5Day()
}

function getApi5Day() {
    var city = getVal()
    // console.log(city)
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7efd1295c0cc0b1c3b635c92e3821a5d&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            return response.json();

        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < data.list.length; i = i + 8) {
                console.log(data.list[i].main.humidity)
                let humid = (data.list[i].main.humidity)
               
`<div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${Monday}</h5>
                    <p class="card-text">Humidity: ${humid}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`



            }


            //  humidity.textContent = "humidity " + humid + " %"
            // let temp = (data.main.temp)
            // let wind = (data.wind.speed)
            // temperature.textContent = "Temp: " + temp + " *F"
            // windSpeed.textContent = "Wind: " + wind + " MPH"
      
        });
}




searchButton.addEventListener("click", getApi)
