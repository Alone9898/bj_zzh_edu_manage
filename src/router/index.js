import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import("@/pages/login/Login.vue"),
    },
    {
        path: '/home',
        name: "主页",
        meta: {requireAuth: true},
        component: () => import("@/pages/home/Home.vue"),
        children: [
            {
                path: '/home/workbench',
                meta: {requireAuth: true},
                name: "工作台",
                component: () => import('@/pages/home/Workbench.vue')
            },
            {
                path: '/DoctorStatistics',
                name: "医生统计",
                meta: {requireAuth: true},
                component: () => import('@/pages/doctorStatistics/index'),
                children: [
                    {
                        path: '/DoctorStatistics/informationList',
                        name: "医生统计 / 医生信息",
                        component: () => import('@/pages/doctorStatistics/informationList/informationList'),
                        meta: {requireAuth: true},
                    },
                    {
                        path: '/DoctorStatistics/statisticsList',
                        name: "医生统计 / 活动统计",
                        component: () => import('@/pages/doctorStatistics/statisticsList/statisticsList'),
                        meta: {requireAuth: true},
                    },
                ]
            },
            {
                path: '/pecipeStatistics',
                name: "处方统计",
                component: () => import('@/pages/recipeStatistics/index'),
                children: [{
                    path: '/recipeStatistics/recipeList',
                    name: "处方统计 / 处方列表",
                    component: () => import('@/pages/recipeStatistics/recipeList/recipeList'),
                    meta: {requireAuth: true},
                }
                ]
            },
            {
                path: '/ordersStatistics',
                name: "订单统计",
                component: () => import('@/pages/ordersStatistics/index'),
                children: [{
                    path: '/ordersStatistics/ordersList',
                    name: "订单统计 / 订单列表",
                    component: () => import('@/pages/ordersStatistics/ordersList/ordersList'),
                    meta: {requireAuth: true},
                }
                ]
            },
            {
                path: '/costStatistics',
                name: "费用统计",
                component: () => import('@/pages/costStatistics/index'),
                children: [{
                    path: '/costStatistics/constList',
                    name: "订单统计 / 费用列表",
                    component: () => import('@/pages/costStatistics/constList/constList'),
                    meta: {requireAuth: true},
                }
                ]
            }
        ]
    },
    {
        path: '*',
        name: 'notFond',
        component: () => import("@/pages/notFond/notFond.vue"),
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 设置路由拦截
router.beforeEach((to, from, next) => {
    let token = window.utils.storage.getter('headerToken')
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (token) { // 通过vuex state获取当前的token是否存在
            next()
        } else {
            next()
            // next({
            //     path: '/',
            // })
        }
    } else {
        next()
    }
})

export default router