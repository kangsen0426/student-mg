import request from "../utils/request";


//获取学员列表请求
export const getStuList = (params) => {
    return request({
        method: 'GET',
        url: '/student',
        params
    })
}

//添加学员请求
export const addStu = (params) => {
    return request({
        method: 'POST',
        url: '/student',
        params
    })
}

//编辑学员请求
export const editStu = (params) => {
    return request({
        method: 'POST',
        url: '/student',
        params
    })
}

//删除学员请求
export const removeStu = (params) => {
    return request({
        method: 'POST',
        url: `/student`,
        params
    })
}

//获取学员成绩列表请求
export const getStuGrades = (params) => {
    return request({
        method: 'GET',
        url: '/student',
        params
    })
}

//删除学员成绩请求
export const removeGrades = (stuID) => {
    return request({
        method: 'DELETE',
        url: `url/${stuID}`
    })
}

//编辑学员成绩请求
export const editGrades = (data) => {
    return request({
        method: 'PUT',
        url: '',
        data
    })
}