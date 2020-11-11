//静态变量文件

const axiosConfig = {
    // baseUrl: 'http://localhost:5000/api',
    baseUrl: 'http://47.99.147.160:8080/api',
    timeout: 30 * 1000
}

const appConfig = {
    // docBaseUrl:'http://localhost:5000/StaticFiles'
    docBaseUrl:'http://47.99.147.160:8080/StaticFiles'
}

export {
    axiosConfig,
    appConfig
}