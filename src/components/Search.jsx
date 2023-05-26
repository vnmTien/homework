import React, { useState, useEffect } from 'react'
import '../components/search.css'
import { dataWeather } from '../data/dataWeather';
import axios from 'axios'

function Search() {

    const apiKey = 'b5b877d35540e79829990362422da1cf';
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [isShow, setIsShow] = useState(false);

    const handleClick = () => {
        if (location !== "") {
            const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
            axios.get(urlApi)
                .then((res) => {
                    let imageSrc = "";
                    switch (res.data.weather[0].main) {
                        case 'Clear':
                            imageSrc = dataWeather[0].img;
                            break;

                        case 'Rain':
                            imageSrc = dataWeather[1].img;
                            break;

                        case 'Snow':
                            imageSrc = dataWeather[2].img;
                            break;

                        case 'Clouds':
                            imageSrc = dataWeather[3].img;
                            break;

                        case 'Haze':
                            imageSrc = dataWeather[4].img;
                            break;

                        case 'Smoke':
                            imageSrc = dataWeather[5].img;
                            break;

                        case 'Mist':
                            imageSrc = dataWeather[6].img;
                            break;

                        case 'Drizzle':
                            imageSrc = dataWeather[7].img;
                            break;

                        default:
                            imageSrc = '';
                    }

                    setData({
                        ...data,
                        Temp: res.data.main.temp,
                        Name: res.data.name,
                        Country: res.data.sys.country,
                        Humidity: res.data.main.humidity,
                        Wind: res.data.wind.speed,
                        image: imageSrc,
                        Description: res.data.weather[0].description
                    })
                    setError('');
                    setIsShow(true);
                })
                .catch(err => {
                    if (err.response.data.cod === '404') {
                        setError('Not Found');
                        setIsShow(false);
                    }
                });
        } else {
            setError('Haven not entered your location')
            setLocation('')
            setIsShow(false);
        }
    };

    return (
        <div className="container" >
            <div className="search-box">
                <i className="fa-solid fa-location-dot"></i>
                <input type="text" placeholder="Enter your location" onChange={e => setLocation(e.target.value)} value={location} />
                <button className="fa-solid fa-magnifying-glass" onClick={handleClick} />
            </div>

            {error ?
                <div className="not-found" style={{ display: isShow ? "none" : "" }}>
                    <img src={dataWeather[8].img} />
                    <p>{error}</p>
                </div> : null
            }

            <div className='weather' style={{ display: isShow ? "block" : "none" }}>
                <div className="weather-box" >
                    <img src={data.image} />
                    <p className="temperature">{data.Temp} °C</p>
                    <p className="description">{data.Description}</p>
                    <h2>{data.Name}</h2>
                    {data.Country ? <h3>{data.Country}</h3> : null}
                </div>

                <div className="weather-details">
                    <div className="humidity">
                        <i className="fa-solid fa-water"></i>
                        <div className="text">
                            <span>{data.Humidity} %</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="wind">
                        <i className="fa-solid fa-wind"></i>
                        <div className="text">
                            <span>{data.Wind} km/h</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Search

