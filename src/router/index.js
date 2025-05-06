import { createWebHistory,createRouter } from "vue-router";
import ComProcess from '@/components/ComProcess.vue';  
import ComNews from '@/components/ComNews.vue';
import Home from '@/components/ComHome.vue';
import Team from '@/components/ComTeam.vue';
import ComServicelist from '@/components/ComServicelist.vue';
import DetailNew from '@/components/DetailNew.vue';
import Contact from '@/components/ContactPage.vue';
// Phần admin
import AdminLayout from '@/components/admin/AdminLayout.vue';
import ProductAdmin from '@/components/admin/ProductAdmin.vue';
import OrderAdmin from '@/components/admin/OrderAdmin.vue';
// import LoginPage from "@/components/admin/LoginPage.vue";
import CategoriesAdmin from "@/components/admin/CategoriesAdmin.vue";
import ComContent from "@/components/admin/ComContent.vue";
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
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
        {
            path: "products",
            name: "ProductAdmin",
            component: ProductAdmin,
        },
        {
            path: "orders",
            name: "OrderAdmin",
            component: OrderAdmin,
        },
        // {
        //     path: "loginpage",
        //     name: "LoginPageAdmin",
        //     component: LoginPage,
        // },
        {
            path: "Categories",
            name: "CategoriesAdmin",
            component: CategoriesAdmin,
        },
        {
            path: "Content",
            name: "ComContent",
            component: ComContent,
        },
        ],
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes,
});
export default router    
