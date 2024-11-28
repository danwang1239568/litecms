<script setup>
  import {
    onMounted
  } from 'vue';
  import {
    RouterLink,
    RouterView,
    useRoute,
    useRouter
  } from 'vue-router';
  import {
    useUserStore
  } from '@/stores'

  onMounted(() => {
    console.log(import.meta.env.DEV);
  })

  const route = useRoute()
  const router = useRouter()

  const userStore = useUserStore()
</script>

<template>
  <div class="box">
    <router-view></router-view>



    <br /><br><br><br><br><br><br><br><br><br>

    <el-button @click="$router.push('/login')">跳首页</el-button>

    <p>token: {{ userStore.token }}</p>
    <el-button @click="userStore.setToken('fseeioufgerghi')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>

  </div>
</template>

<style scoped lang="scss">
</style>
