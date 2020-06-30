// axios拦截器
import axios from 'axios'
import { axiosConfig } from '../common/const'
import { getLocalStorageToken, clearLocalStorage, Msg } from '../common/util'
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
        Msg.warn('登录过期，请重新登录...')
        setTimeout(() => {
            window.location.hash = '#/login'
        }, 1000)
        return Promise.reject();
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