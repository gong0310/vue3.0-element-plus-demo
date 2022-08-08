import axios from 'axios'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
const addPending = (config) => {
    const url = [
        config.method,
        config.url,
        JSON.stringify(config.params),
        JSON.stringify(config.data)
    ].join('&')
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
            pending.set(url, cancel)
        }
    })
}
/**
 * 移除请求
 * @param {Object} config 
 */
const removePending = (config) => {
    const url = [
        config.method,
        config.url,
        JSON.stringify(config.params),
        JSON.stringify(config.data)
    ].join('&')
    console.log('url=', url)
    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url)
        cancel(url)
        pending.delete(url)
    }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url)
    }
    pending.clear()
}

const instance = axios.create({
    baseURL: 'http://api-hmugo-web.itheima.net/api/',
    timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
});

instance.defaults.headers.common['Authorization'] = 'dsdsd';


// 添加请求拦截器
instance.interceptors.request.use((config) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    console.log('发送请求之前')
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log('响应数据之后', response.config)
    removePending(response.config) // 在请求结束后，移除本次请求
    // 对响应数据做点什么
    return response;
}, function (error) {
    if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
    } else {
        // handle error code
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});


export const getBanner = () => {
    return instance({
        method: 'get',
        url: 'public/v1/home/swiperdata',
        params: {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }
    });
}