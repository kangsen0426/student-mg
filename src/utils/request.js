import axios from "axios";

const request = axios.create({
    baseURL: 'http://121.199.57.133:8080',
})

export default request