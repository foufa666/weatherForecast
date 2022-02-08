import moment from 'moment';

const getWeekday = date => moment(date * 1000).format('dddd').substring(0, 3);

const getUpcomingDaysForecast = data =>
    data.daily.slice(1).map(day => ({
        imgUrl: day.weather[0].icon,
        temperature: Math.round(day.temp.max),
        weekday: getWeekday(day.dt),
    }));

export default getUpcomingDaysForecast;