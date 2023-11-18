function updateTime(){
    let time = document.getElementById('time');
    let longtime = new Date();
    
    time.innerHTML = longtime.toLocaleString('en-US', { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"})
}

updateTime()
setInterval(updateTime, 1000);

function putDate(){
    let dateElement = document.getElementById('date');

    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date();
    // const day = weekday[dateObj.getDay()];
    // const date = dateObj.getDate();
    // const month = dateObj.getMonth()+1;
    // const year = dateObj.getFullYear();
    
    // dateElement.innerHTML = day+", &nbsp&nbsp&nbsp"+date+"."+month+"."+year;

    dateElement.innerHTML = dateObj.toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric"});
}

putDate();