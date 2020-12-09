import request from '@/utils/request'
import qs from 'querystring'

// 用户注册
const register = ({ username, telephone, password, captcha }) => {
    return request.post('/auth/register', qs.stringify({ username, telephone, password, captcha }));
}

// 用户登录
const login = ({ telephone, password }) => {
    return request.post('/auth/login', qs.stringify({ telephone, password }));
}

const info = () => {
    console.log("info has been called")
    return request.get('/auth/info');
}

// 更新token
const updateToken = () => {
    return request.get('/auth/updateToken');
}

export default {
    login,
    register,
    info,
    updateToken,
}