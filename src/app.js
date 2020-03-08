const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

const app=express()

//define paths for express config
const publicpath = path.join(__dirname,"../public")
const viewspath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")


//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewspath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicpath))

app.get("",(req,res) => {
    res.render("index",{
        title:"weather",
        name:"mohit"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        title:"help",
        name:"mohit",
        message:"get help"
    })
})
app.get("/about",(req,res) => {
    res.render("about",{
        title:"about",
        name:"mohit",
        message:"about the page"
    })
})
// app.get("*",(req,res) =>{
//     res.render("error",{
//         title:"about",
//         name:"mohit",
//         error:"page not found"
//     })
// })

// app.get("/help/*",(req,res) =>{
//     res.render("error",{
//         title:"about",
//         name:"mohit",
//         error:"help article not found"
//     })
// })


app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast:forecastdata,
                    location,
                    address:req.query.address
                })
            })
    })
    // res.send({
    //     forecast:"clear all day",
    //     location:"rohtak haryana",
    //     address:req.query.address
    // })
})
// app.get("/product",(req,res) => {
//     res.send({
//         products:[]
//     })
// })

app.listen(3000, ()=>{
    console.log("server is running")
})