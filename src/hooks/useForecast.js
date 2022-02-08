import { useState } from "react";
import axios from 'axios';
import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast'


const GEO_API_KEY = "ee9b8288499a1d452f746547c60546e1"
const API_KEY = "aa91369c546917c5d0b7d9a6cbae4c1a"


const useForecast = () => {

    const [isError, SetError] = useState(false);
    const [isLoading, SetLoading] = useState(false);
    const [forecast, SetForcast] = useState(null);


    const submitRequest = async (location) => {

        // get the location data
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${GEO_API_KEY}`;
        const location_req = await axios.get(GEO_URL);
        const location_data = location_req.data;
        
        if (!location_data || location_data.length === 0) {
            SetError('there is no such location');
            SetLoading(false)
            return;
        }

        SetLoading(true);
        SetError(false);
        const latitude = location_data[0].lat;
        const longitude = location_data[0].lon;
        
        // get the weather data
        const WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`;
        const weather_req = await axios.get(WEATHER_URL);
        const weather_data = weather_req.data;
        console.log(weather_data)
        
        const currentDay = getCurrentDayForecast(weather_data, location);
        const currentDayDetails = getCurrentDayDetailedForecast(weather_data);
        const upcomingDays = getUpcomingDaysForecast(weather_data);
        
        SetForcast({
            currentDay,
            currentDayDetails,
            upcomingDays
        });
        SetLoading(false);

    }
      
  const getMyLocationForecast = async () => {
    
    

    navigator.geolocation.getCurrentPosition(async (position) => {
      
    
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat);
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`;
    const weather_req = await axios.get(WEATHER_URL);
    const weather_data = weather_req.data;
    
    
    console.log(weather_data)
    
    const GEO_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${GEO_API_KEY}`;
    const myCity_req = await axios.get(GEO_URL);
    const myCity_data = myCity_req.data;


    const myCity =myCity_data[0].name;
    const currentDay = getCurrentDayForecast(weather_data, myCity);
    const currentDayDetails = getCurrentDayDetailedForecast(weather_data);
    const upcomingDays = getUpcomingDaysForecast(weather_data);
    
    SetForcast({
        currentDay,
        currentDayDetails,
        upcomingDays
    });
    SetLoading(false);


  }, () => {});
}//end of mylocation





return {
        isError, 
        isLoading, 
        forecast,
        submitRequest,
        getMyLocationForecast,
        
}
}
export default useForecast;