import { createWebHistory,createRouter } from "vue-router";
import ComProcess from '@/components/ComProcess.vue';  
import ComNews from '@/components/ComNews.vue';
import Home from '@/components/ComHome.vue';
import Team from '@/components/ComTeam.vue';
import ComServicelist from '@/components/ComServicelist.vue';
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
        path: "/team",
        name: "Team",
        component: Team,
    },
    {
        path: "/servicelist",
        name: "Servicelist",
        component: ComServicelist,
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes,
});
export default router    