<script setup>
import { defineEmits } from 'vue'
// import { routes } from '@/router'
import { useRoute } from 'vue-router'
import { useRouterStore } from '../../stores'

const route = useRoute()
const defaultActive = route.fullPath

const routerStore = useRouterStore()

const homeRoutes = routerStore.routes[0].children // routes[0].children[0].children

const emit = defineEmits(['change'])
</script>

<template>
  <div class="menu">
    <el-menu
      mode="vertical"
      background-color="#222"
      text-color="#eee"
      :default-active="defaultActive"
      router
    >
      <img class="logo" src="@/assets/logo.png" />

      <div v-for="item in homeRoutes" :key="item.path">
        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="subItem.path"
            @click="emit('change')"
          >
            <el-icon>
              <component :is="subItem.meta.icon" />
            </el-icon>
            <span>{{ subItem.meta.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.path" @click="emit('change')">
          <el-icon>
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.menu {
  height: 100vh;
  background-color: #222;
  text-align: center;
  user-select: none;
  padding: 2%;

  .logo {
    margin: 20px 0;
    width: 100%;
  }
}
</style>
