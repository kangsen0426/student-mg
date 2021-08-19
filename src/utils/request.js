import axios from "axios";

const request = axios.create({
    baseURL: 'http://121.199.57.133/',
})

export default request