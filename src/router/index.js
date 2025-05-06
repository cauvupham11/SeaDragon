import { createWebHistory,createRouter } from "vue-router";
import ComProcess from '@/components/ComProcess.vue';  
import ComNews from '@/components/ComNews.vue';
import Home from '@/components/ComHome.vue';
import Team from '@/components/ComTeam.vue';
import ComServicelist from '@/components/ComServicelist.vue';
import ProductAdmin from '@/components/admin/ProductAdmin.vue';
import DetailNew from '@/components/DetailNew.vue';
import Contact from '@/components/ContactPage.vue';
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
    },
    {
        path:"/productadmin",
        name:"ProductAdmin",
        component:ProductAdmin,
    },
    {
        path:"/detailnew",
        name:"DetailNew",
        component:DetailNew,
    },
    {
        path:"/contact",
        name:"Contact",
        component:Contact,
    }


]
const router=createRouter({
    history:createWebHistory(),
    routes,
});
export default router    