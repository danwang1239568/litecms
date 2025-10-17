import { constantRoutes, asyncRoutes } from '@/router'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import router, { resetRouter } from '@/router'
import { useUserStore } from './user'
import { deepClonePreserveMarkRaw } from '@/utils/format'

export const hasPermission = (route, role) => {
  if (route.meta.roles) {
    return route.meta.roles.includes(role)
  }
  return true
}

export const filterRoutes = (routes, role) => {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(tmp, role)) {
      if (tmp.children && tmp.children.length) {
        tmp.children = filterRoutes(tmp.children, role)
      }
      res.push(tmp)
    }
  })
  return res
}

export const useRouterStore = defineStore('router', () => {
  const routes = ref(deepClonePreserveMarkRaw(constantRoutes))
  const addRoutes = (accessedRoutes) => {
    if (accessedRoutes.length) {
      accessedRoutes.forEach((r) => {
        router.addRoute('home', r)
      })
    }
    const aMap = routes.value.map((item) => item.path)
    accessedRoutes.forEach((route) => {
      if (!aMap.includes(route.path)) {
        // routes.value = [...routes.value, route]
        routes.value[0].children.unshift(route)
      }
    })
  }

  let hasAdded = ref(false)

  const generateRoutes = () => {
    const {
      user: { role }
    } = useUserStore()
    const accessedRoutes = filterRoutes(asyncRoutes, role)
    addRoutes(accessedRoutes)
  }

  const resetRouterStore = () => {
    hasAdded.value = false
    resetRouter()
    routes.value = deepClonePreserveMarkRaw(constantRoutes)
  }

  return {
    routes,
    addRoutes,
    hasAdded,
    generateRoutes,
    resetRouter: resetRouterStore
  }
})
