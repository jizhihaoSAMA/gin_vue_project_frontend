import request from '@/utils/request'
import qs from 'querystring'

// 用户注册
const register = ({ username, telephone, password }) => {
    return request.post('/auth/register', qs.stringify({ username, telephone, password }));
}

// 用户登录
const login = ({ telephone, password }) => {
    return request.post('/auth/login', qs.stringify({ telephone, password }));
}

const info = () => {
    return request.get('/auth/info');
}

export default {
    login,
    register,
    info,
}