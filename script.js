let input = document.querySelector(".cityinput > input")
let btn = document.querySelector('.cityinput > button');
let showInfo = document.querySelector('p');
let errormsg = document.querySelector('.errormsg');
let body = document.querySelector('body');


btn.addEventListener('click', () => weatherApp());
input.addEventListener("keyup", (e) => {
  if (e.key == 'Enter') {
    weatherApp();
  }
});

function weatherApp() {

  let cityName = input.value;
  input.value = "";
  let digitnum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


  if (cityName.trim() === "") {

    errormsg.classList.add('displayblockmsg');
    errormsg.innerHTML = `⛔ City name can't be <b>empty</b>`;

    setTimeout(() => {
      errormsg.classList.remove('displayblockmsg');
    }, 2000);

  } else if (digitnum.some(item => cityName.includes(item)) === true) {

    errormsg.classList.add('displayblockmsg');
    errormsg.innerHTML = `❌ City name cannot contain <b>numbers</b>`;

    setTimeout(() => {
      errormsg.classList.remove('displayblockmsg');
    }, 2000);

  }
  else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)
      .then((response => response.json()))
      .then(data => {
        showDataUI(data);
        weatherimgType(data);
      })
      .catch(error => {
        console.log("Error:", error);
      })
  }

  function showDataUI(data) {

    let temp = document.querySelector('.we-temp-header > h1');
    temp.innerHTML = data.main.temp;

    let tempImg = document.querySelector('.we-temp-card > img')
    tempImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;


    let weatherType = document.querySelector('.we-temp-card > p')
    weatherType.innerHTML = data.weather[0].description;

    let todayTempDate = document.querySelector('.we-temp-footer > div');
    let cityname = document.querySelector('.we-temp-footer > div:last-child > span');
    let date = new Date()
    todayTempDate.firstElementChild.innerText = `${date.toDateString()}`;
    cityname.innerHTML = `${cityName} <span>${data.sys.country}</span>`;

    let cards = document.querySelectorAll('.wea-wrapper-card');
    cards[0].firstElementChild.innerHTML = data.main.humidity + " %";
    cards[1].firstElementChild.innerHTML = data.main.pressure + " mb";
    cards[3].firstElementChild.innerHTML = data.wind.speed.toFixed(1) + " km/h";
    cards[4].firstElementChild.innerHTML = data.main.feels_like.toFixed(1);

  }

  function weatherimgType(data) {
    let weatherhowType = data.weather[0].icon;

    switch (weatherhowType) {
      //clear sky
      case "01d":
      case "01n":
        body.style.backgroundImage = 'url(https://images.pexels.com/photos/1775862/pexels-photo-1775862.jpeg)';
        break;

      //Clouds
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        body.style.backgroundImage = 'url(https://images.pexels.com/photos/912875/pexels-photo-912875.jpeg)';
        break;

      //Rain
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        body.style.backgroundImage = 'url(https://images.pexels.com/photos/1841447/pexels-photo-1841447.jpeg)';
        break;

      //Thunderstorm
      case "11d":
      case "11n":
        body.style.backgroundImage = 'url(https://images.pexels.com/photos/3637060/pexels-photo-3637060.jpeg)';
        break;

      //Snow
      case "13d":
      case "13n":
        body.style.backgroundImage = 'url(https://images.pexels.com/photos/35421494/pexels-photo-35421494.jpeg)';
        break;

      //mist fogi
      case "50d":
      case "50n":
        body.style.backgroundImage = 'url(https://images.pexels.com/photos/1287083/pexels-photo-1287083.jpeg)';
        break;

      default:
        body.style.backgroundImage = 'url(assest/img-sunny-day.jpg)';
      break;
    }
  }

}
