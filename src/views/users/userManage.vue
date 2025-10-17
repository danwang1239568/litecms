<script setup>
import { ref } from 'vue'
import { usersGetListApi } from '@/api/users'

const isLoading = ref(false)
const userList = ref([])

async function getUserListe() {
  const res = await usersGetListApi()
  userList.value = res.data?.data
}
getUserListe()
</script>

<template>
  <pageContainer title="用户管理">
    <template #extra> </template>

    <el-table
      v-loading="isLoading"
      :data="userList"
      :header-cell-style="{ background: '#eee', textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      stripe
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="" label="头像" width="100">
        <template #default="{ row }">
          <img width="40" :src="row.avatar" alt="avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
  </pageContainer>
</template>

<style scoped lang="scss"></style>
