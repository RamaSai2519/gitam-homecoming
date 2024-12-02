import axios from "axios";

export const BASE_URL = "https://7iox8huibl.execute-api.ap-south-1.amazonaws.com/main";

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:8000";
} else {
    axios.defaults.baseURL = BASE_URL;
}

export const Raxios = axios.create();
export default Raxios;