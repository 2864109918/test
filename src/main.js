import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Toast
} from 'vant';
import 'lib-flexible' //网页缩放
import './vant/index'; //vant按需导入

Vue.use(Toast);

Vue.config.productionTip = false;

// 提示框
Vue.prototype.$tip = msg => Toast({
    message: msg ? msg : '请稍后...',
    forbidClick: true,
    duration: 1500
});
// 加载提示
Vue.prototype.$loading = msg => Toast.loading({
    message: msg ? msg : '请稍后...',
    forbidClick: true,
    duration: 0
});

router.beforeEach((to, from, next) => {
        let isLogin = localStorage.getItem('token');
        if (isLogin && to.name === 'login') { //浏览器有token并且你处于登录页，那么直接跳转home页
            next('/home')
            return
        }


        if (isLogin || to.name == "registered" || to.name == 'applying' || to.name == 'reviewFail') { //没有token不允许跳转，但是可以跳转注册页 审核中页 审核失败页
            next();
        } else {
            if (to.name == 'login') {
                next();
            } else {
                next('/index/login');
            }
        }
    }),

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')