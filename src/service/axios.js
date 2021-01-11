import { Notification } from 'element-ui';
import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
    axios.defaults.baseURL = '/api/';
}

axios.defaults.timeout = 50000;

//添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        let token = window.sessionStorage.getItem('token') // token的获取
        if (token) {
            config.headers.common['Access-Token'] = token
        }
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

//添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        // 登陆失效, 清空本地存储后刷新页面
        if (response.data.code) {
            if (response.data.code === -99) {
                Notification({
                    title: response.data.message,
                    type: 'error'
                });
                window.utils.storage.remove('userInfo');
                window.utils.storage.remove('headerToken');
                window.utils.storage.remove('exposedToken');
                setTimeout(() => {
                    window.location.href = window.location.origin
                }, 1000);
            }
            if (response.data.code !== 0) {
                Notification({
                    title: response.data.message || "未知错误",
                    type: 'error'
                });
                return Promise.reject(response.data);
            }
        }
        return response.data;
    },
    function(error) {
        Notification({
            title: error.message || "未知错误",
            type: 'error'
        });

        return Promise.reject(error);
    }
);

export default axios;