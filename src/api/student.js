import request from "../utils/request";


//获取学员列表请求
export const getStuList = (params) => {
    return request({
        method: 'GET',
        url: '',
        params
    })
}

//添加学员请求
export const addStu = (data) => {
    return request({
        method: 'POST',
        url: '',
        data
    })
}

//编辑学员请求
export const editStu = (data) => {
    return request({
        method: 'PUT',
        url: '',
        data
    })
}

//删除学员请求
export const removeStu = (stuID) => {
    return request({
        method: 'DELETE',
        url: `url/${stuID}`
    })
}