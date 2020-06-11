// axios拦截器
import axios from 'axios'
import { axiosConfig } from '../common/const'
import { getLocalStorageToken, clearLocalStorage } from '../common/util'
import { Message } from 'element-ui'

const instance = axios.create({
    baseURL: axiosConfig.baseUrl,
    timeout: axiosConfig.timeout
})

// 请求拦截器
instance.interceptors.request.use(config => {
    config.headers['Authorization'] = getLocalStorageToken() || ''
    return config;
}, err => {
    // 什么情况下触发？？？
    Message({
        message: err.message,
        type: 'error'
    })
    return Promise.reject(err);
})

// 响应拦截器
instance.interceptors.response.use((res) => {
    if (res.data.Code == 401) {
        clearLocalStorage();
        //授权未通过,跳转登入页
        console.log(`授权失败，请重新登入...`)
    }

    return res;
}, (err) => {
    if (err.response) {
        return Promise.resolve(err.response.data);
    }

    Message({
        message: err.message,
        type: 'error'
    })
    return Promise.reject(err);
})

export default instance;