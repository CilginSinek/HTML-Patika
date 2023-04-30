import axios from "axios";
import * as dotenv from 'dotenv'
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
dotenv.config()
export const getDatas = async (lat, lon) => {
    try {
        const response = await axios.get(apiUrl,{
            params:{
                lat: lat,
                lon:lon,
                appid: process.env.ApiKey
            }
        } 
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
