const currentTime = document.querySelector("h1"),
content  = document.querySelector(".content"),
currentDate = document.querySelector("h2"),
currentDay = document.querySelector("h3"),
setAlarmBtn = document.querySelector("button"),
selectMenu = document.querySelectorAll("select");
alarmTimeDisplay = document.getElementById("alarm-time-display"); 

let alarmTime , isAlarmSet = false,
ringtone = new Audio("iphone_alarm.mp3")
// Populating the hours in the first select menu
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating the minutes in the second select menu
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating the AM/PM in the third select menu
for (let i = 2; i > 0; i--) {
    let ampm = i === 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Set interval to update time and date every second
setInterval(() => {
    const now = new Date();

    // Getting hours, minutes, seconds and AM/PM
    let h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ampm = "AM";

    // Converting 24-hour format to 12-hour format
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    if (h === 0) {
        h = 12; // 12 AM
    }

    // Adding leading zeros to time
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    
    if(alarmTime ==  `${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;

       }
       

    
    
     // Get the day of the week and full date
     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
     const dayOfWeek = daysOfWeek[now.getDay()];
     
     // Getting the full date in a readable format
     
     const options = { year: 'numeric', day: 'numeric', month: 'long' };
     const CurrentDate = now.toLocaleDateString(undefined, options);

    

 
     // Updating the HTML to display time, day, and date
     currentDate.innerText = `${CurrentDate} `;
     currentDay.innerText = `${dayOfWeek}`;
    
}, 1000);
   

function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "set alarm";
         return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")){
       return alert("please, select the valid time to set Alarm !");
    }
    
    alarmTime = time;
    isAlarmSet = true;
    alarmTimeDisplay.innerText = alarmTime;
    alert("Alarm is set ");
    content.classList.add("disable");
    setAlarmBtn.innerText = "clear alarm";
}
setAlarmBtn.addEventListener("click",setAlarm);
    
