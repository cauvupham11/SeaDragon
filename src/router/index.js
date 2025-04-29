import { createWebHistory,createRouter } from "vue-router";
import ComProcess from '@/components/ComProcess.vue';  
import ComNews from '@/components/ComNews.vue';
import Home from '@/components/ComHome.vue';
import ComNewsDetail from '@/components/ComDetailsNew.vue';
const routes=[
    {
        path: "/",
        name:Home,
        component:Home,
    },
    {
        path: "/Process",
        name: "Process",
        component: ComProcess,
    },
    {
        path: "/news",
        name: "News",
        component: ComNews,
    },
    {
        path: "/detail",
        name:"detail",
        component: ComNewsDetail,
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes,
});
export default router    