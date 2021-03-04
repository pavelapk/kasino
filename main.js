let wheel = document.getElementById("wheel");
let deg = 0;
let vel = 0;
let acc = 0;



async function spin() {
    let rand = await getWeather();
    acc = rand * 0.2 + 0.1;
    vel = 0;
    let interval_id = setInterval(() => {
        wheel.style.transform = `rotate(${deg}deg)`;
        deg += vel;
        vel += acc;
        deg = deg % 360;

        if (vel > 20) acc = -(rand * 0.2 + 0.1);
        if (vel < 0) clearInterval(interval_id);
    }, 1000 / 60);
}



async function getWeather() {
    let address = await (await fetch("https://randommer.io/random-address", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: "number=1&culture=ru"
    })).json();
    console.log(address);
    let city = address[0].split(',')[4].trim();
    let r = await fetch(`http://wttr.in/${city}?format=j1`)
    let data = await r.json();
    console.log(data);
    let cur = data.current_condition[0];
    document.getElementById('info').innerHTML = `Город: ${city}, ${cur.temp_C}°C`;
    let rand_num = +cur.FeelsLikeC + +cur.FeelsLikeF + +cur.humidity +
        +cur.pressureInches + +cur.temp_C + +cur.temp_F + +cur.visibility + +cur.winddirDegree;
    return (rand_num % 300) / 300;
}