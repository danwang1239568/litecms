<script setup>
import {
  Memo,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'
import { defineEmits } from 'vue'

const routes = [
  {
    path: '/article/channel',
    icon: Memo,
    title: '文章分类'
  },
  {
    path: '/article/manage',
    icon: Promotion,
    title: '文章管理'
  },
  {
    path: '3',
    icon: UserFilled,
    title: '个人中心',
    sub: [
      {
        path: '/user/profile',
        icon: User,
        title: '基本资料'
      },
      {
        path: '/user/avatar',
        icon: Crop,
        title: '更换头像'
      },
      {
        path: '/user/password',
        icon: EditPen,
        title: '重置密码'
      }
    ]
  }
]

const emit = defineEmits('change')
</script>

<template>
  <div class="menu">
    <el-menu
      mode="vertical"
      background-color="#222"
      text-color="#eee"
      default-active="/article/channel"
      router
    >
      <img class="logo" src="@/assets/logo.png" />

      <div v-for="item in routes" :key="item.path">
        <el-sub-menu v-if="item.sub" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.sub"
            :key="subItem.path"
            :index="subItem.path"
            @click="emit('change')"
          >
            <el-icon>
              <component :is="subItem.icon" />
            </el-icon>
            <span>{{ subItem.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.path" @click="emit('change')">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
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
