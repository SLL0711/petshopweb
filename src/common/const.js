//静态变量文件

const axiosConfig = {
    baseUrl: 'http://localhost:5000/api',
    timeout: 30 * 1000
}

const appConfig = {
    docBaseUrl:'http://localhost:5000/StaticFiles'
}

export {
    axiosConfig,
    appConfig
}