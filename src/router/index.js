import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    //默认显示此页面
    {
        path: '',
        redirect: '/index'
    },
    //登录页
    {
        name: 'index',
        path: '/index',
        component: () =>
            import('@/views/login'),
        children: [{
                path: '/index',
                redirect: 'login'
            },
            { //子路由登录
                name: 'login',
                path: 'login',
                component: () =>
                    import('@/views/login/login')
            },
            { //子路由注册
                name: "registered",
                path: 'registered',
                component: () =>
                    import('@/views/login/registered')
            }
        ]
    },
    //申请中
    {
        name: "applying",
        path: '/applying',
        component: () =>
            import('@/views/login/applying')
    },
    //申请失败
    {
        name: "reviewFail",
        path: '/reviewFail',
        component: () =>
            import('@/views/login/reviewFail')
    },
    //主页答题
    {
        name: "home",
        path: '/home',
        component: () =>
            import('@/views/Answer/home')
    },
    //我的
    {
        name: "profile",
        path: '/profile',
        component: () =>
            import('@/views/profile/profile')
    },
    //个人资料
    {
        name: "profileInfo",
        path: '/profileInfo',
        component: () =>
            import('@/views/profile/profileInfo')

    },
    //答题记录
    {
        name: "answerRecord",
        path: '/answerRecord',
        component: () =>
            import('@/views/profile/answerRecord')

    },

    //查看证书
    {
        name: "certificate",
        path: '/certificate',
        component: () =>
            import('@/views/profile/certificate')
    },
    //意见反馈
    {
        name: "opinion",
        path: '/opinion',
        component: () =>
            import('@/views/profile/opinion')
    },
    // 设置
    {
        name: "setting",
        path: '/setting',
        component: () =>
            import('@/views/profile/setting')
    },
    // 修改密码
    {
        name: "resetPassword",
        path: '/resetPassword',
        component: () =>
            import('@/views/profile/resetPassword')
    },

    // 公告列表
    {
        name: "bulletin",
        path: '/bulletin',
        component: () =>
            import('@/views/bulletin/bulletin')
    },
    // 公告详情
    {
        name: "bulletinDetails",
        path: '/bulletinDetails/:id',
        component: () =>
            import('@/views/bulletin/bulletinDetails')
    },


];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router