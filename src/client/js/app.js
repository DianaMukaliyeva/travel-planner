import { getCityDetail, postCityDetail } from './cityDetail';

export const postImageData = async (url='', data={}) => {
    const request = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const postWeatherData = async (url='', data={}) => {
    const request = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const getWeather = async (url='', city_id, api_key) => {
    const request = await fetch(`${url}city_id=${city_id}&key=${api_key}`);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        return ({'error': error});
    }
}


export const getImage = async (url='', cityData, api_key) => {
    const request = await fetch(`${url}q=${cityData.name}+${cityData.countryName}&key=${api_key}`);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        return ({'error': error});
    }
}

const getTripInformation = async (url, data) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        return ({error, error});
    }
}

export const handleSubmit = async (event) => {
    event.preventDefault();
    // const username = 'mdiana';
    // const weather_key = 'd24718d636654782a2825a08f03f3c96';
    // const pixabay_key = '16892068-6efdba9e3cc819c3fd622d1fe';
    
    const city = document.getElementById('city').value;
    const date = document.getElementById('depart_date').value;
    const now = new Date();
    const timeOffset = now.getTimezoneOffset() * 60000;
    const data = {city: city, departDate: date, timeOffset: timeOffset};
    console.log(city);
    console.log(date);
    const tripInfo = await getTripInformation('http://localhost:5000/tripInfo', data);
    console.log(tripInfo);
    // try {
    //     const cityData = await getCityDetail('http://api.geonames.org/searchJSON?maxRows=1&', city, username);
    //     console.log(cityData);
    //     postCityDetail('http://localhost:5000/cityDetails', cityData);
    //     const weatherData = await getWeather('https://api.weatherbit.io/v2.0/current?image_type=photo&', cityData.geonameId, weather_key);
    //     console.log(weatherData);
    //     postWeatherData('http://localhost:5000/weatherData', weatherData.data[0]);
    //     const imgUrl = await getImage('https://pixabay.com/api/?', cityData, pixabay_key);
    //     console.log(imgUrl);
    //     postImageData('http://localhost:5000/images', imgUrl);
    //     fetch('http://localhost:5000/data')
    //     .then (res => {return res.json()})
    //     .then(res => console.log(res));
    // } catch (e) {
    //     alert('Something went wrong');
    // }
};
