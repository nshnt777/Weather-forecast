import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import _ from 'lodash';


const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const apiKey = "16c4c78266a7343d3cd9e75b95ee98e1";
const country_code = "IN";
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// add air pollution api
// add 5 day forecast api
// add humidity levels
// add rain possibility

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.locals._ = _;

var city_name = "Delhi";

app.get('/', async(req,res)=>{
    try {
        let place = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=1&appid=${apiKey}`);
        if(_.isEmpty(place.data)){
            throw new Error("No match found")
        }
        
        var lat = place.data[0].lat;
        var lon = place.data[0].lon;
        let currentWeather = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        let forecast = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        const result = await Promise.all([currentWeather, forecast]);

        res.render('index.ejs', {weather: result[0].data, place: place.data[0], forecasts: result[1].data.list});
        // res.render('index.ejs', {weather: currentWeather.data, place: place.data[0]});
    } catch (err) {
        console.log(err);
        res.render("index.ejs", {error: err.message});
    }
});

app.post("/search", async(req, res)=>{
    try {
        city_name = req.body.search;
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.render("index.ejs", {error: err.message});
    }
});

app.listen(port, ()=>{
    console.log('Listening at http://'+hostname+":"+port);
});