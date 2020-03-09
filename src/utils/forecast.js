const request=require("request")

const forecast = (latitude,longitude, callback) => {
    const url="https://api.darksky.net/forecast/9eaaa2b395526a2c36fe25bfa4ac3982/" +latitude+","+longitude

    request({url ,json:true}, (error,{body} ) =>{
        if(error) {
            callback("unable to connect to service",undefined)
        }else if(body.error) {
            callback("unable to find location,try another",undefined)
        }else{
            console.log(body)
            callback(undefined,{
                humidity:body.currently.humidity,
                summary:body.hourly.summary,
                temprature:body.currently.temperature,
                rainchance:body.currently.precipProbability,
                windspeed:body.currently.windSpeed,
                expected:body.daily.summary
            })
        }
    })
}

module.exports = forecast