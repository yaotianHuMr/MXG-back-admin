import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login"   
import Layout from "../views/layout";
import Home from "../views/home"
import Member from "../views/member"
import Supplier from "../views/supplier"
import Goods from "../views/goods"
import Staff from "../views/staff"
Vue.use(VueRouter);

const routes = [
  {
    path:"*",
    redirect:'/'
  },
  // 主页
  {
    path : "/",
    name : "layout",
    component : Layout,
    redirect : "/home",
    children : [
      {
        path : "/home",
        component : Home,
        meta : {
          auth : true
        }
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: Login
  },
  // 会员管理
  {
    path : "/member",
    component: Layout,
    children : [
      {
        path : "/",
        component : Member,
        meta : {
          title : "会员管理"
        }
      }
    ]
  },
  // 供应商管理
  {
    path : "/supplier",
    component: Layout,
    children : [
      {
        path : "/",
        component : Supplier,
        meta : {
          title : "供应商管理"
        }
      }
    ]
  },
  // 商品管理
  {
    path : "/goods",
    component: Layout,
    children : [
      {
        path : "/",
        component : Goods,
        meta : {
          title : "商品管理"
        }
      }
    ]
  },
  // 员工管理
  {
    path : "/staff",
    component: Layout,
    children : [
      {
        path : "/",
        component : Staff,
        meta : {
          title : "员工管理",
        }
      }
    ]
  },
 
 
];

const router = new VueRouter({
  routes
});

export default router;