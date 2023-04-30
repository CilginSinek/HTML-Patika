import { createContext, useContext, useEffect, useState } from "react";
import { getDatas } from "../myfuncs/callfuncs";
import Datalisting from "../myfuncs/Datalisting"


//plakalari ve kordinatlari almak için json aldim.
import iller from './iller.json'

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {

    //localstorage ve fetch olmaz ise otomatik calissin diye kendim ekledim.
    const [country, setCountry] = useState(localStorage.getItem("country") || "Istanbul");
    const [cityInfo, setCityInfo] = useState({
        "plaka": 34,
        "il_adi": "ISTANBUL",
        "lat": 41.00527,
        "lon": 28.97696,
        "northeast_lat": 41.320786,
        "northeast_lon": 29.456456,
        "southwest_lat": 40.80275,
        "southwest_lon": 27.971307
    });
    const [countryWeather, setCountryWeather] = useState({
        "cod": "200",
        "message": 0,
        "cnt": 40,
        "list": [
            {
                "dt": 1681668000,
                "main": {
                    "temp": 292.68,
                    "feels_like": 292.12,
                    "temp_min": 288.85,
                    "temp_max": 292.68,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1009,
                    "humidity": 55,
                    "temp_kf": 3.83
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 42
                },
                "wind": {
                    "speed": 4.02,
                    "deg": 102,
                    "gust": 8.2
                },
                "visibility": 10000,
                "pop": 0.29,
                "rain": {
                    "3h": 0.15
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-16 18:00:00"
            },
            {
                "dt": 1681678800,
                "main": {
                    "temp": 290.28,
                    "feels_like": 289.62,
                    "temp_min": 288.13,
                    "temp_max": 290.28,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1007,
                    "humidity": 60,
                    "temp_kf": 2.15
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 53
                },
                "wind": {
                    "speed": 2.63,
                    "deg": 86,
                    "gust": 4.11
                },
                "visibility": 10000,
                "pop": 0.01,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-16 21:00:00"
            },
            {
                "dt": 1681689600,
                "main": {
                    "temp": 286.86,
                    "feels_like": 286.38,
                    "temp_min": 286.86,
                    "temp_max": 286.86,
                    "pressure": 1010,
                    "sea_level": 1010,
                    "grnd_level": 1007,
                    "humidity": 80,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 80
                },
                "wind": {
                    "speed": 1.12,
                    "deg": 186,
                    "gust": 1.42
                },
                "visibility": 9073,
                "pop": 0.32,
                "rain": {
                    "3h": 0.38
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-17 00:00:00"
            },
            {
                "dt": 1681700400,
                "main": {
                    "temp": 286.35,
                    "feels_like": 286.02,
                    "temp_min": 286.35,
                    "temp_max": 286.35,
                    "pressure": 1010,
                    "sea_level": 1010,
                    "grnd_level": 1007,
                    "humidity": 88,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 2.17,
                    "deg": 44,
                    "gust": 2.97
                },
                "visibility": 10000,
                "pop": 0.91,
                "rain": {
                    "3h": 1.83
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-17 03:00:00"
            },
            {
                "dt": 1681711200,
                "main": {
                    "temp": 287.21,
                    "feels_like": 286.86,
                    "temp_min": 287.21,
                    "temp_max": 287.21,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1007,
                    "humidity": 84,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 0.56,
                    "deg": 98,
                    "gust": 0.85
                },
                "visibility": 10000,
                "pop": 0.91,
                "rain": {
                    "3h": 0.52
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-17 06:00:00"
            },
            {
                "dt": 1681722000,
                "main": {
                    "temp": 290.23,
                    "feels_like": 289.82,
                    "temp_min": 290.23,
                    "temp_max": 290.23,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 70,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 0.41,
                    "deg": 316,
                    "gust": 0.96
                },
                "visibility": 10000,
                "pop": 0.28,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-17 09:00:00"
            },
            {
                "dt": 1681732800,
                "main": {
                    "temp": 291.49,
                    "feels_like": 290.97,
                    "temp_min": 291.49,
                    "temp_max": 291.49,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 61,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 98
                },
                "wind": {
                    "speed": 2.02,
                    "deg": 301,
                    "gust": 2.78
                },
                "visibility": 10000,
                "pop": 0.37,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-17 12:00:00"
            },
            {
                "dt": 1681743600,
                "main": {
                    "temp": 287.95,
                    "feels_like": 287.71,
                    "temp_min": 287.95,
                    "temp_max": 287.95,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1008,
                    "humidity": 85,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 80
                },
                "wind": {
                    "speed": 4.15,
                    "deg": 6,
                    "gust": 5.05
                },
                "visibility": 10000,
                "pop": 0.84,
                "rain": {
                    "3h": 3.26
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-17 15:00:00"
            },
            {
                "dt": 1681754400,
                "main": {
                    "temp": 286.98,
                    "feels_like": 286.77,
                    "temp_min": 286.98,
                    "temp_max": 286.98,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 90,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 78
                },
                "wind": {
                    "speed": 1.69,
                    "deg": 105,
                    "gust": 2.71
                },
                "visibility": 10000,
                "pop": 0.88,
                "rain": {
                    "3h": 3.49
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-17 18:00:00"
            },
            {
                "dt": 1681765200,
                "main": {
                    "temp": 286.53,
                    "feels_like": 286.25,
                    "temp_min": 286.53,
                    "temp_max": 286.53,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1009,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03n"
                    }
                ],
                "clouds": {
                    "all": 37
                },
                "wind": {
                    "speed": 1.43,
                    "deg": 69,
                    "gust": 1.5
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-17 21:00:00"
            },
            {
                "dt": 1681776000,
                "main": {
                    "temp": 286.06,
                    "feels_like": 285.7,
                    "temp_min": 286.06,
                    "temp_max": 286.06,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 88,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 51
                },
                "wind": {
                    "speed": 2.41,
                    "deg": 31,
                    "gust": 2.91
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-18 00:00:00"
            },
            {
                "dt": 1681786800,
                "main": {
                    "temp": 284.92,
                    "feels_like": 284.55,
                    "temp_min": 284.92,
                    "temp_max": 284.92,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1007,
                    "humidity": 92,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.35,
                    "deg": 24,
                    "gust": 5.54
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-18 03:00:00"
            },
            {
                "dt": 1681797600,
                "main": {
                    "temp": 286.63,
                    "feels_like": 286.23,
                    "temp_min": 286.63,
                    "temp_max": 286.63,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1008,
                    "humidity": 84,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.89,
                    "deg": 33,
                    "gust": 5.4
                },
                "visibility": 10000,
                "pop": 0.33,
                "rain": {
                    "3h": 0.14
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-18 06:00:00"
            },
            {
                "dt": 1681808400,
                "main": {
                    "temp": 290.3,
                    "feels_like": 289.87,
                    "temp_min": 290.3,
                    "temp_max": 290.3,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1008,
                    "humidity": 69,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 1.86,
                    "deg": 74,
                    "gust": 2.79
                },
                "visibility": 10000,
                "pop": 0.46,
                "rain": {
                    "3h": 0.12
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-18 09:00:00"
            },
            {
                "dt": 1681819200,
                "main": {
                    "temp": 290.79,
                    "feels_like": 290.39,
                    "temp_min": 290.79,
                    "temp_max": 290.79,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1007,
                    "humidity": 68,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 64
                },
                "wind": {
                    "speed": 1.43,
                    "deg": 32,
                    "gust": 1.8
                },
                "visibility": 10000,
                "pop": 0.76,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-18 12:00:00"
            },
            {
                "dt": 1681830000,
                "main": {
                    "temp": 288.35,
                    "feels_like": 288.17,
                    "temp_min": 288.35,
                    "temp_max": 288.35,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 86,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 69
                },
                "wind": {
                    "speed": 3.96,
                    "deg": 50,
                    "gust": 4.58
                },
                "visibility": 10000,
                "pop": 0.96,
                "rain": {
                    "3h": 3.52
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-18 15:00:00"
            },
            {
                "dt": 1681840800,
                "main": {
                    "temp": 286.91,
                    "feels_like": 286.67,
                    "temp_min": 286.91,
                    "temp_max": 286.91,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1009,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 79
                },
                "wind": {
                    "speed": 1.14,
                    "deg": 121,
                    "gust": 2.74
                },
                "visibility": 10000,
                "pop": 1,
                "rain": {
                    "3h": 1.1
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-18 18:00:00"
            },
            {
                "dt": 1681851600,
                "main": {
                    "temp": 285.62,
                    "feels_like": 285.35,
                    "temp_min": 285.62,
                    "temp_max": 285.62,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 93,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 2.52,
                    "deg": 12,
                    "gust": 3.05
                },
                "visibility": 10000,
                "pop": 0.81,
                "rain": {
                    "3h": 0.19
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-18 21:00:00"
            },
            {
                "dt": 1681862400,
                "main": {
                    "temp": 285.21,
                    "feels_like": 284.87,
                    "temp_min": 285.21,
                    "temp_max": 285.21,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1007,
                    "humidity": 92,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 81
                },
                "wind": {
                    "speed": 1.79,
                    "deg": 13,
                    "gust": 2
                },
                "visibility": 10000,
                "pop": 0.77,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-19 00:00:00"
            },
            {
                "dt": 1681873200,
                "main": {
                    "temp": 284.95,
                    "feels_like": 284.51,
                    "temp_min": 284.95,
                    "temp_max": 284.95,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1007,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 78
                },
                "wind": {
                    "speed": 2.21,
                    "deg": 335,
                    "gust": 2.61
                },
                "visibility": 10000,
                "pop": 0.32,
                "rain": {
                    "3h": 0.15
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-19 03:00:00"
            },
            {
                "dt": 1681884000,
                "main": {
                    "temp": 285.09,
                    "feels_like": 284.61,
                    "temp_min": 285.09,
                    "temp_max": 285.09,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 87,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 89
                },
                "wind": {
                    "speed": 2.68,
                    "deg": 342,
                    "gust": 3.12
                },
                "visibility": 10000,
                "pop": 0.31,
                "rain": {
                    "3h": 0.27
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-19 06:00:00"
            },
            {
                "dt": 1681894800,
                "main": {
                    "temp": 286.49,
                    "feels_like": 285.92,
                    "temp_min": 286.49,
                    "temp_max": 286.49,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1008,
                    "humidity": 78,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 2.61,
                    "deg": 327,
                    "gust": 3.06
                },
                "visibility": 10000,
                "pop": 0.04,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-19 09:00:00"
            },
            {
                "dt": 1681905600,
                "main": {
                    "temp": 287.18,
                    "feels_like": 286.52,
                    "temp_min": 287.18,
                    "temp_max": 287.18,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 72,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.49,
                    "deg": 355,
                    "gust": 4.11
                },
                "visibility": 10000,
                "pop": 0.08,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-19 12:00:00"
            },
            {
                "dt": 1681916400,
                "main": {
                    "temp": 286.8,
                    "feels_like": 286.1,
                    "temp_min": 286.8,
                    "temp_max": 286.8,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 1008,
                    "humidity": 72,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.67,
                    "deg": 16,
                    "gust": 5.11
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-19 15:00:00"
            },
            {
                "dt": 1681927200,
                "main": {
                    "temp": 284.63,
                    "feels_like": 284.05,
                    "temp_min": 284.63,
                    "temp_max": 284.63,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1009,
                    "humidity": 85,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 88
                },
                "wind": {
                    "speed": 2.59,
                    "deg": 23,
                    "gust": 4.73
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-19 18:00:00"
            },
            {
                "dt": 1681938000,
                "main": {
                    "temp": 284.13,
                    "feels_like": 283.53,
                    "temp_min": 284.13,
                    "temp_max": 284.13,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 86,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03n"
                    }
                ],
                "clouds": {
                    "all": 45
                },
                "wind": {
                    "speed": 2.59,
                    "deg": 351,
                    "gust": 4.58
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-19 21:00:00"
            },
            {
                "dt": 1681948800,
                "main": {
                    "temp": 283.46,
                    "feels_like": 282.87,
                    "temp_min": 283.46,
                    "temp_max": 283.46,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 62
                },
                "wind": {
                    "speed": 1.83,
                    "deg": 338,
                    "gust": 2.85
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-20 00:00:00"
            },
            {
                "dt": 1681959600,
                "main": {
                    "temp": 283.68,
                    "feels_like": 283.11,
                    "temp_min": 283.68,
                    "temp_max": 283.68,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1009,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 81
                },
                "wind": {
                    "speed": 1.79,
                    "deg": 321,
                    "gust": 3.3
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-20 03:00:00"
            },
            {
                "dt": 1681970400,
                "main": {
                    "temp": 285.16,
                    "feels_like": 284.43,
                    "temp_min": 285.16,
                    "temp_max": 285.16,
                    "pressure": 1014,
                    "sea_level": 1014,
                    "grnd_level": 1010,
                    "humidity": 77,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 88
                },
                "wind": {
                    "speed": 1.44,
                    "deg": 285,
                    "gust": 2
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-20 06:00:00"
            },
            {
                "dt": 1681981200,
                "main": {
                    "temp": 285.87,
                    "feels_like": 285.13,
                    "temp_min": 285.87,
                    "temp_max": 285.87,
                    "pressure": 1014,
                    "sea_level": 1014,
                    "grnd_level": 1011,
                    "humidity": 74,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 2.58,
                    "deg": 245,
                    "gust": 2.76
                },
                "visibility": 10000,
                "pop": 0.28,
                "rain": {
                    "3h": 0.3
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-20 09:00:00"
            },
            {
                "dt": 1681992000,
                "main": {
                    "temp": 287.75,
                    "feels_like": 286.94,
                    "temp_min": 287.75,
                    "temp_max": 287.75,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 64,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 98
                },
                "wind": {
                    "speed": 1.33,
                    "deg": 239,
                    "gust": 1.54
                },
                "visibility": 10000,
                "pop": 0.31,
                "rain": {
                    "3h": 0.18
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-20 12:00:00"
            },
            {
                "dt": 1682002800,
                "main": {
                    "temp": 287.65,
                    "feels_like": 286.77,
                    "temp_min": 287.65,
                    "temp_max": 287.65,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1009,
                    "humidity": 62,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03d"
                    }
                ],
                "clouds": {
                    "all": 42
                },
                "wind": {
                    "speed": 1.66,
                    "deg": 195,
                    "gust": 1.43
                },
                "visibility": 10000,
                "pop": 0.01,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-20 15:00:00"
            },
            {
                "dt": 1682013600,
                "main": {
                    "temp": 286.38,
                    "feels_like": 285.59,
                    "temp_min": 286.38,
                    "temp_max": 286.38,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 70,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03n"
                    }
                ],
                "clouds": {
                    "all": 27
                },
                "wind": {
                    "speed": 1.07,
                    "deg": 94,
                    "gust": 1.31
                },
                "visibility": 10000,
                "pop": 0.01,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-20 18:00:00"
            },
            {
                "dt": 1682024400,
                "main": {
                    "temp": 285.94,
                    "feels_like": 285.21,
                    "temp_min": 285.94,
                    "temp_max": 285.94,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 74,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 801,
                        "main": "Clouds",
                        "description": "few clouds",
                        "icon": "02n"
                    }
                ],
                "clouds": {
                    "all": 12
                },
                "wind": {
                    "speed": 1.13,
                    "deg": 121,
                    "gust": 1.23
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-20 21:00:00"
            },
            {
                "dt": 1682035200,
                "main": {
                    "temp": 285.45,
                    "feels_like": 284.77,
                    "temp_min": 285.45,
                    "temp_max": 285.45,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1009,
                    "humidity": 78,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03n"
                    }
                ],
                "clouds": {
                    "all": 37
                },
                "wind": {
                    "speed": 1.6,
                    "deg": 148,
                    "gust": 1.86
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-21 00:00:00"
            },
            {
                "dt": 1682046000,
                "main": {
                    "temp": 284.91,
                    "feels_like": 284.23,
                    "temp_min": 284.91,
                    "temp_max": 284.91,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 1009,
                    "humidity": 80,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03n"
                    }
                ],
                "clouds": {
                    "all": 29
                },
                "wind": {
                    "speed": 1.38,
                    "deg": 159,
                    "gust": 1.55
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-04-21 03:00:00"
            },
            {
                "dt": 1682056800,
                "main": {
                    "temp": 286.08,
                    "feels_like": 285.33,
                    "temp_min": 286.08,
                    "temp_max": 286.08,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 73,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 63
                },
                "wind": {
                    "speed": 2.24,
                    "deg": 239,
                    "gust": 3.14
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-21 06:00:00"
            },
            {
                "dt": 1682067600,
                "main": {
                    "temp": 288,
                    "feels_like": 287.29,
                    "temp_min": 288,
                    "temp_max": 288,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1010,
                    "humidity": 67,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 99
                },
                "wind": {
                    "speed": 2.23,
                    "deg": 290,
                    "gust": 2.52
                },
                "visibility": 10000,
                "pop": 0.37,
                "rain": {
                    "3h": 0.19
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-21 09:00:00"
            },
            {
                "dt": 1682078400,
                "main": {
                    "temp": 289.97,
                    "feels_like": 289.3,
                    "temp_min": 289.97,
                    "temp_max": 289.97,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1009,
                    "humidity": 61,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 73
                },
                "wind": {
                    "speed": 2.29,
                    "deg": 328,
                    "gust": 2.8
                },
                "visibility": 10000,
                "pop": 0.25,
                "rain": {
                    "3h": 0.39
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-21 12:00:00"
            },
            {
                "dt": 1682089200,
                "main": {
                    "temp": 288.52,
                    "feels_like": 287.84,
                    "temp_min": 288.52,
                    "temp_max": 288.52,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 1009,
                    "humidity": 66,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 18
                },
                "wind": {
                    "speed": 4.42,
                    "deg": 27,
                    "gust": 4.93
                },
                "visibility": 10000,
                "pop": 0.24,
                "rain": {
                    "3h": 0.32
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-04-21 15:00:00"
            }
        ],
        "city": {
            "id": 738354,
            "name": "Karaköy",
            "coord": {
                "lat": 41.0053,
                "lon": 28.977
            },
            "country": "TR",
            "population": 0,
            "timezone": 10800,
            "sunrise": 1681615442,
            "sunset": 1681663412
        }
    });
    const [weatherlist, setWeatherlist] = useState([]);
    const [tempture, setTempture] = useState(localStorage.getItem("Tempture") || "K");

    useEffect(()=>{
        localStorage.setItem("Tempture", tempture)
    },[tempture])

    useEffect(() => {
        //En son secilen ili buluyor.
        localStorage.setItem("country", country);
        //Listeden kordinaat buluyorum
        setCityInfo(iller.find((item) => item.il_adi === country.toUpperCase()));

    }, [country]);

    useEffect(() => {
        async function fetchData() {
            // Secilen il kordinaatlarina gore veri alindi
            let data = await getDatas(cityInfo.lat, cityInfo.lon);
            setCountryWeather(data);
        }

        fetchData();
    }, [cityInfo]);

    useEffect(() => {
        // Belirli saatlere gore verileri ayristirdim.(her gun için 3 saat araliklarla veri veren liseden belirli saatleri aldım.)
        setWeatherlist(Datalisting(countryWeather.list))
    }, [countryWeather]);
    
    const values = {
        country,
        setCountry,
        cityInfo,
        countryWeather,
        weatherlist,
        tempture,
        setTempture
    };

    return <CountryContext.Provider value={values}>{children}</CountryContext.Provider>

};

export const useCountry = () => useContext(CountryContext);