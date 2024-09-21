const bodyElm=document.querySelector("body");
const titLogo=document.querySelector(".title");
let apiData={
    url:"https://api.openweathermap.org/data/2.5/weather?q=",
    key:"124b92a8dd9ec01ffb0dbf64bc44af3c"
}



addEventListener('load',()=>{
     const numRandom=Math.ceil(Math.random()*6);
     bodyElm.style.backgroundImage=`url('images/${numRandom}.jpg')`;
     if(numRandom==6){
        titLogo.style.color='black';
     }
})
const input= document.getElementById('get-city');
input.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        fetchData();
    }
})
if(localStorage.length==0)input.value = "california";
else input.value=localStorage.getItem('city');
fetchData();
input.value = "";

let error=document.querySelector(".error");


async function fetchData(){
    let city=input.value;
      try {
          const req = await fetch(`${apiData.url}${city}&&appid=${apiData.key}`);
          const res = await req.json(); 
          localStorage.setItem("city",city);
           DOM(res);
        } catch (err) {
          localStorage.clear();
          error.innerHTML= 'No se encontro la ciudad';
          setTimeout(()=> error.innerHTML= '',1300);
         
        }
      }


let cityName=document.querySelector(".city-name");
let temp=document.querySelector(".weather-deg");
let condition=document.querySelector(".weather-condition");
let humidity=document.querySelector(".humidity");   
let date=document.querySelector(".date"); 
    
function DOM(data){
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
	temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
	condition.innerHTML = data.weather[0].description;
	humidity.innerHTML = `humidity: ${data.main.humidity}%`;
	date.innerHTML = getDate();
}


let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function getDate() {
	let newTime = new Date();
	let month = months[newTime.getMonth()];
	return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`;
}