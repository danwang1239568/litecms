<script setup>
import pageContainer from '@/components/pageContainer.vue';
import { ref } from 'vue';
import { userUpdatePassword } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const formData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})
const rules = {
  old_pwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    // 与原密码不一致
    {
      validator(rule, value, callback) {
        if (value === formData.value.old_pwd) {
          callback(new Error('新密码不能与旧密码相同'));
        } else {
          callback();
        }
      }
    }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    // 与新密码一致
    {
      validator(rule, value, callback) {
        if (value !== formData.value.new_pwd) {
          callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }
    }
  ]
}
const formRef = ref();

const handleSubmit = async () => {
  await formRef.value.validate()
  await userUpdatePassword(formData.value)
  ElMessage.success('密码修改成功')
  // 修改完成后退出登录
  userStore.setToken('')
  userStore.setUser({})
  router.push('/login')
}

const handleReset = () => {
  formRef.value.resetFields();
}

</script>

<template>
  <pageContainer title="重置密码">
    <el-form :model="formData" :rules="rules" label-width="100px" ref="formRef" @submit.native.prevent
      style="width: 50%;">
      <el-form-item prop="old_pwd" label="旧密码">
        <el-input v-model="formData.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="new_pwd" label="新密码">
        <el-input v-model="formData.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="re_pwd" label="确认新密码">
        <el-input v-model="formData.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="default" @click="handleReset">重置</el-button>

      </el-form-item>
    </el-form>
  </pageContainer>
</template>

<style></style>
