/* Global Variables */
let zipCode;
let feeling;
let url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const metric = '&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate()+'.'+ (d.getMonth()+ 1)+'.'+  d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '9b41d119c4ec24f77c2adc5cea493c9f';

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
const submit = (event) => {
    event.preventDefault();
    zipCode = document.getElementById('zip').value;
    feeling = document.getElementById('feelings').value;
    getWeatherData(url+ zipCode +'&appid='+ apiKey + metric)
    .then((data) => {
        console.log(data);
        postData('/data', {temp: data.main.temp, date: newDate, feeling})
        .then((res)=>{ 
            updateUI(res)
        })
    })
}
document.getElementById('generate').addEventListener('click', submit);
/* Function to GET Web API Data*/
const getWeatherData = async (url = '') => {
    const res = await fetch(url)

    try {
      const data = await res.json();
      return data;
    } catch(error) {
        console.log("error", error);
    }
}
/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),       
    });

    try {
        const newData = await res.json();
        return newData
    } catch(error) {
        console.log("error", error);
    }

}

/* Function to GET Project Data */
const updateUI = async(data) => {
    const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feeling;

  }catch(error){
    console.log("error", error);
  }
}
