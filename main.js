let city_search = document.querySelector("#city_search");
let search_button = document.querySelector("#search_button");

let getData = async (city)=>{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},it&appid=3486bf09c6ccf0dee589eec2026dd800&lang=it`);
    let json = await response.json();
    return json;
}

search_button.addEventListener( "click", ()=>{
    domManipulation(city_search.value);
});

let domManipulation = async (city)=>{
    let json = await getData(city);
    city_search.value = '';
    
    let temp_min = document.querySelector("#temp_min");
    let temp = document.querySelector("#temp");
    let temp_max = document.querySelector("#temp_max");
    let city_name = document.querySelector("#city_name");
    let lat = document.querySelector("#lat");
    let lon = document.querySelector("#lon");
    let description = document.querySelector("#description");
    let sunrise = document.querySelector("#sunrise");
    let sunset = document.querySelector("#sunset");
    let cards = document.querySelectorAll('.card-custom')

    
    temp_min.innerHTML = `Minima: ${Math.round(json.main.temp_min - 273.15)}°`;
    temp.innerHTML = `Media: ${Math.round(json.main.temp - 273.15)}°`;
    temp_max.innerHTML = `Massima: ${Math.round(json.main.temp_max - 273.15)}°`;
    
    city_name.innerHTML = json.name;
    
    lat.innerHTML = `Latitudine: ${json.coord.lat}`;
    lon.innerHTML = `Longitudine: ${json.coord.lon}`;
    
    description.innerHTML = `${json.weather[0].description}`;
    
    sunrise.innerHTML = `Alba - ${new Date(json.sys.sunrise * 1000).toLocaleTimeString('it-IT')}`;
    sunset.innerHTML = `Tramonto - ${new Date(json.sys.sunset * 1000).toLocaleTimeString('it-IT')}`;
    
    
    cards.forEach(card => {

        let video = document.createElement('video');
        video.muted = true;
        video.play();
    
        if (json.clouds.all < 40) {
            video.innerHTML = '<source src="./media/sun.mp4" type="video/mp4">';
        } else if (json.clouds.all < 80) {
            video.innerHTML = '<source src="./media/cloud.mp4" type="video/mp4">';
        } else {
            video.innerHTML = '<source src="./media/rain.mp4" type="video/mp4">';
        }

        video.classList.add('card-custom-video');
        card.appendChild(video);
    });
    
    
    let textWrappers = document.querySelectorAll('.ml2');
    textWrappers.forEach((textWrapper) => {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        
        anime.timeline()
        .add({
            targets: `.ml2 .letter`,
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i
        }).add({
            targets: `.ml2`,
            opacity: 1,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
    });
    console.log(json);
}