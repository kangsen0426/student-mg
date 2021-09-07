import request from "../utils/request";

//登入请求
export const LoginRequest = (params) => {
    return request({
        method: 'POST',
        url:'/admin',
        params
    })
}



//注册请求
export const register = (params) => {
    return request({
        method: 'POST',
        url:'',
        params
    })
}


