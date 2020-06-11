//公共函数仓库
let getLocalStorageToken = () => {
    return window.localStorage.getItem("token")
}

let setLocalStorageToken = (token) => {
    window.localStorage.setItem("token", 'Bearer ' + token)
}

let clearLocalStorage = () => {
    window.localStorage.clear()
}

export {
    getLocalStorageToken,
    setLocalStorageToken,
    clearLocalStorage
}