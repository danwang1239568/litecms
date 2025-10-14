<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const route = useRoute()
const router = useRouter()

// 测试用
import request from '@/utils/request'

import { useUserStore } from '@/stores'
const userStore = useUserStore()
window.testFn = async () => {
  console.log(userStore.token)
  const res = await userStore.getUser()
  console.log(res)
}
</script>

<template>
  <div class="box">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style></style>
