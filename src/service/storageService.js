// 本地缓存服务

const PREFIX = '';

// user模块
const USER_PREFOX = `${PREFIX}user_`;
const USER_TOKEN = `${USER_PREFIX}token`;
const USER_INFO = `${USER_PREFIX}info`;

// 储存
const set = (key, data) =>{
    localStorage.setItem(key, data)
};

// 读取
const get = (key) => localStorage.get(key);

export default{
    set,
    get,
    USER_TOKEN,
    USER_INFO,
};