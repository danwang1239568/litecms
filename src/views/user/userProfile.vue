<script setup>
import pagecontainer from '@/components/pageContainer.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoApi } from '@/api/user'
import { ElMessage } from 'element-plus'

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
  await userUpdateInfoApi(formData.value)
  await userStore.getUser()
  ElMessage.success('成功更新用户信息')
}
</script>

<template>
  <pagecontainer title="基本资料">
    <el-form
      :model="formData"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="width: 100%; max-width: 400px"
    >
      <el-form-item label="登录名称" prop="username">
        <el-input disabled v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </pagecontainer>
</template>

<style></style>
