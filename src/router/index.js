import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layouts/basicLayout.vue'
import Login from '../views/system/auth/login.vue'


const routes = [
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/',
      name: '首页',
      redirect: '/dashboard/workplace',
      component: BasicLayout,
      children: [
        {
          path: '/dashboard',
          name: '仪表盘',
          redirect: '/dashboard/workplace',
          children: [
            {
              path: '/dashboard/analysis',
              name: '分析页',
              component: () => import('../views/system/dashboard/analysis.vue')
            },
            {
              path: '/dashboard/workplace',
              name: '工作台',
              component: () => import('../views/system/dashboard/workplace.vue')
            }
          ]
        },
        {
          path: '/system',
          name: '系统管理',
          redirect: '/system/menu',
          children: [
            {
              path: '/system/menu',
              name: '菜单管理',
              component: () => import('../views/system/menu/index.vue')
            },
            {
              path: '/system/dept',
              name: '部门管理',
              component: () => import('../views/system/dept/index.vue')
            },
            {
              path: '/system/position',
              name: '岗位管理',
              component: () => import('../views/system/position/index.vue')
            },
            {
              path: '/system/role',
              name: '角色管理',
              component: () => import('../views/system/role/index.vue')
            },
            {
              path: '/system/user',
              name: '用户管理',
              component: () => import('../views/system/user/index.vue')
            },
            {
              path: '/system/log',
              name: '操作日志',
              component: () => import('../views/system/log/index.vue')
            }
          ]
        }
      ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router
