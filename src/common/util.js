//公共函数仓库

import { Message } from 'element-ui'

let getLocalStorageToken = () => {
    return window.localStorage.getItem("token")
}

let setLocalStorageToken = (token) => {
    window.localStorage.setItem("token", 'Bearer ' + token)
}

let clearLocalStorage = () => {
    window.localStorage.clear()
}

// Element-ui 提示框
let Msg = {
    success(msg) {
        Message({
            type: 'success',
            message: msg
        })
    },
    info(msg) {
        Message({
            type: 'info',
            message: msg
        })
    },
    warn(msg) {
        Message({
            type: 'warning',
            message: msg
        })
    },
    error(msg) {
        Message({
            type: 'error',
            message: msg
        })
    },
}

export {
    getLocalStorageToken,
    setLocalStorageToken,
    clearLocalStorage,
    Msg
}