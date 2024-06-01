
function updateDigitalClock() {

    let day = new Date();
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let seconds = day.getSeconds();
    
    let hoursTens = Math.floor(hours / 10);
    let hoursOnes = hours % 10;
    
    document.getElementById('h').style.backgroundImage = `url("./Images/digital/${hoursTens}.gif")`;
    document.getElementById('hh').style.backgroundImage = `url("./Images/digital/${hoursOnes}.gif")`;

    let minutesTens = Math.floor(minutes / 10);
    let minutesOnes = minutes % 10;
    
    document.getElementById('m').style.backgroundImage = `url("./Images/digital/${minutesTens}.gif")`;
    document.getElementById('mm').style.backgroundImage = `url("./Images/digital/${minutesOnes}.gif")`;

    let secondsTens = Math.floor(seconds / 10);
    let secondsOnes = seconds % 10;
    
    document.getElementById('s').style.backgroundImage = `url("./Images/digital/${secondsTens}.gif")`;
    document.getElementById('ss').style.backgroundImage = `url("./Images/digital/${secondsOnes}.gif")`;
}

function updateAnalogClock() {

    const deg = 6;
    const hours = document.querySelector('#analog_hr');
    const minutes = document.querySelector('#analog_min');
    const seconds = document.querySelector('#analog_sec');

    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    
    hours.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
    minutes.style.transform = `rotateZ(${mm}deg)`;
    seconds.style.transform = `rotateZ(${ss}deg)`;
}

setInterval(() => {
    updateAnalogClock();
    updateDigitalClock();
}, 500);