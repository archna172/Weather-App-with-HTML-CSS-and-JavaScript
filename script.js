// http://api.weatherapi.com/v1/current.json?key=93db04da44b346d0a7a134530241508&q=Kozhikode&aqi=no


const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'kannur';

const fetchResults = async (targetlocation) => {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=93db04da44b346d0a7a134530241508&q=${targetlocation}&aqi=no`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data); // Log the entire response to inspect it

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        console.log(`Condition in ${locationName}: ${condition}`); // Log the condition

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    const date = new Date(time);


    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, optionsDate);
    const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    
    const currentDay = getDayName(date.getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${formattedDate} ${currentDay} ${formattedTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
}
