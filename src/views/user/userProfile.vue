<script setup>
import pagecontainer from '@/components/pageContainer.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfo } from '@/api/user';

const userStore = useUserStore()

const getUser = async () => {
  await userStore.getUser()
  console.log(userStore.user)
}
const formData = ref({
  id: userStore.user.id,
  username: userStore.user.username,
  nickname: userStore.user.nickname,
  email: userStore.user.email
})
getUser()

const formRef = ref(null)

const rules = {
  username: [
    { required: true, message: '请输入登录名称', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdateInfo(formData.value)
  userStore.getUser()
}

</script>

<template>
  <pagecontainer title="基本资料">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px" style="width: 600px;">
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </pagecontainer>

</template>

<style></style>
