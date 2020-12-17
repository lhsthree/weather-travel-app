/* Global Variables */



/* full API URL
http://api.openweathermap.org/data/2.5/weather?zip=60618,us&units=imperial&APPID=24e1111bc260485a37b54b9d9ca8f6e6 */


const btn = document.getElementById("generate");
const date = document.getElementById("date");
const content = document.getElementById("content")
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//API key and base URL
const baseURL ="http://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "24e1111bc260485a37b54b9d9ca8f6e6"



const performAction = (e) => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(`${baseURL}${zip},us&units=imperial&APPID=${apiKey}`)
    .then(function (data) {
      postData('/add', {
        temp: data.main.temp,
        date: newDate,
        content: feelings,
      }).then(updateUI);
    })
}




//post data

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//get webAPI info
const getWeather = async (url)=> {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }catch (error){
        console.log("error", error);
    }
};


//get project data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        date.innerHTML = allData.date;
        temp.innerHTML = allData.temp;
        content.innerHTML = allData.content;
    }catch (error){
        console.log("error",error);
    }
}


//use event listener to add function
btn.addEventListener('click', performAction);