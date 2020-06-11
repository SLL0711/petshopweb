import instance from './interceptor'

// axios get 请求
let get = (url, config = {}) => {
    return instance({
        url,
        method: 'get',
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

// axios post 请求
let post = (url, data, config = { method: 'post' }) => {
    return instance({
        url,
        method: 'post',
        data,
        headers: { 'content-type': 'application/json' },
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

let postUrlencode = (url, data, config = { method: 'post' }) => {
    return instance({
        url,
        method: 'post',
        data,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export default {
    get, post, postUrlencode
}