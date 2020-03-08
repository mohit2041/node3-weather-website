const request=require("request")

const forecast = (latitude,longitude, callback) => {
    const url="https://api.darksky.net/forecast/9eaaa2b395526a2c36fe25bfa4ac3982/" +latitude+","+longitude

    request({url ,json:true}, (error,{body} ) =>{
        if(error) {
            callback("unable to connect to service",undefined)
        }else if(body.error) {
            callback("unable to find location,try another",undefined)
        }else{
            callback(undefined,{
                summary:body.currently.summary,
                temprature:body.currently.temperature+"degree celsius",
                rainchance:body.currently.precipProbability + "%"
            })
        }
    })
}

module.exports = forecast