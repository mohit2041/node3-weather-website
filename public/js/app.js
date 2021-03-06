console.log("js file has loaded")

// fetch("http://localhost:3000/weather?address=boston").then((response) =>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm=document.querySelector("form")
const search =document.querySelector("input")
const messageOne=document.querySelector("#message-1")
const messageTwo=document.querySelector("#message-2")
// messageOne.textContent="hello mohit"


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="loading message"
    // messageOne.textContent=""
    fetch("/weather?address="+location).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            // console.log(data.error)
        }else{
            messageOne.textContent=data.location
            const weatherreport = data.forecast.summary+"\n"+
            " , temperature : "+data.forecast.temprature +"* fahrenheit\n"+ 
            " , rain chance : "+data.forecast.rainchance+" %\n"+
            " , humidity : "+data.forecast.humidity+" %\n"+
            " , windspeed : "+data.forecast.windspeed+" km/hr\n"+
            " , forecast : "+data.forecast.expected

            messageTwo.textContent=weatherreport
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
    // console.log("testing")
})