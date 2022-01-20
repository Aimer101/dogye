import axios from "axios";

const BASE_URL = "https://dogye.herokuapp.com/api";

export const publicReq = axios.create({ baseURL: BASE_URL });
