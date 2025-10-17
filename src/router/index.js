import { createRouter, createWebHistory } from 'vue-router'
import { useRouterStore, useUserStore } from '@/stores'
import { Memo, Promotion, UserFilled, User, Crop, EditPen, Avatar } from '@element-plus/icons-vue'
import { markRaw } from 'vue'

export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/layoutContainer.vue'),
    redirect: '/user/profile',
    meta: {
      menubar: true,
      title: ''
    },
    children: [
      {
        path: '/user',
        redirect: '/user/profile',
        component: () => import('@/views/user/userPage.vue'),
        meta: {
          menubar: true,
          title: '个人中心',
          icon: markRaw(UserFilled)
        },
        children: [
          {
            path: '/user/profile',
            component: () => import('@/views/user/userProfile.vue'),
            meta: {
              menubar: true,
              title: '基本资料',
              icon: markRaw(User)
            }
          },
          {
            path: '/user/password',
            component: () => import('@/views/user/userPassword.vue'),
            meta: {
              menubar: true,
              title: '重置密码',
              icon: markRaw(Crop)
            }
          },
          {
            path: '/user/avatar',
            component: () => import('@/views/user/userAvatar.vue'),
            meta: {
              menubar: true,
              title: '更换头像',
              icon: markRaw(EditPen)
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/loginPage.vue'),
    meta: {
      menubar: false,
      title: '登录'
    }
  },
  {
    path: '/test',
    component: () => import('@/views/TestPage.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/article/channel',
    component: () => import('@/views/article/articleChannel.vue'),
    name: 'channel',
    meta: {
      menubar: true,
      title: '文章分类',
      icon: markRaw(Promotion),
      roles: ['admin', 'guest']
    }
  },
  {
    path: '/article/manage',
    component: () => import('@/views/article/articleManage.vue'),
    name: 'manage',
    meta: {
      menubar: true,
      title: '文章管理',
      icon: markRaw(Memo),
      roles: ['admin', 'guest']
    }
  },
  {
    path: '/users',
    component: () => import('@/views/users/userManage.vue'),
    name: 'users',
    meta: {
      menubar: true,
      title: '用户管理',
      icon: markRaw(Avatar),
      roles: ['admin', 'guest']
    }
  }
]

const createMyRouter = () => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
  })
}

const router = createMyRouter()

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return next('/login')

  const routerStore = useRouterStore()
  if (userStore.token && !routerStore.hasAdded) {
    routerStore.generateRoutes()
    routerStore.hasAdded = true
    return next({ ...to, replace: true })
  }
  next()
})

export default router

export const resetRouter = () => {
  const routerStore = useRouterStore()
  asyncRoutes.forEach((route) => {
    if (route.name) {
      router.removeRoute(route.name)
    }
  })
  routerStore.hasAdded = false
}
