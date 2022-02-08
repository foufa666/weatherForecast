import moment from 'moment';

const getCurrentDayForecast = (data, title) => ({
    weekday: moment(data.current.dt * 1000).format('dddd'),
    date: moment(data.current.dt * 1000).format('MMMM Do GGGG'),
    location: title,
    temperature: Math.round(data.current.temp),
    weatherIcon: `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`,
    weatherDescription: data.current.weather[0].description,
});

export default getCurrentDayForecast;