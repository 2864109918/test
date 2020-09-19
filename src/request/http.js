/*
 *   axios封装
 *   请求拦截、相应拦截、错误统一处理
 */
import AXIOS from 'axios';
import QS from 'qs';
import {
    Toast
} from 'vant';
import router from '@/router'
// import store from '../store/index'

let axios = AXIOS.create();


// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
}

// 请求超时时间
axios.defaults.timeout = 15000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 带cookie请求
axios.defaults.withCredentials = true;
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // const token = localStorage.getItem('token');
        // token && (config.headers.Authorization = token);
        const token = localStorage.getItem('token');
        token && (config.headers.token = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            // 状态码判断
            switch (error.response.status) {
                /**
                 * 以下状态码为后台给的约束
                 */
                // 401: 未登录 
                case 401:
                    // localStorage.clear();
                    localStorage.removeItem('access_token');
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                    // 406 token过期
                case 406:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    // localStorage.clear();
                    localStorage.removeItem('access_token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                    // 403: 错误
                case 403:
                    Toast({
                        message: error.response.data.data.err_message,
                        duration: 1000,
                        forbidClick: true
                    });
                    break;
                    // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                default:
                    Toast({
                        message: error.response.data.data.err_message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params), config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
export function post2(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}