import { createRouter, createWebHashHistory } from "vue-router";
import {clearPending} from '../axios'

// 静态路由
const initRouter = [
    {
        path: "/",
        name: "login",
        component: () => import("@/views/login.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
    },
];
// 动态路由
const asyncRouter = [
    {
        path: "/a",
        name: "a",
    },
    {
        path: "/b",
        name: "b",
    },
];
const asyncRouterList = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(asyncRouter)
        }, 300)
    })
}
const router = createRouter({
    history: createWebHashHistory(),
    routes: initRouter,
});

router.beforeEach(async (to, from, next) => {
    //路由跳转前，清空请求
    clearPending()
    // 请求后台路由
    const a = await asyncRouterList()
    //添加请求到的路由
    a.forEach(i => {
        router.options.routes.push(i);
        router.addRoute(i.name, i);
    })
    next();
});
export default router;