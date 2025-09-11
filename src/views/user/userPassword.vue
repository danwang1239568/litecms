<script setup>
import pageContainer from '@/components/pageContainer.vue';
import { ref } from 'vue';
import { userUpdatePasswordApi } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const formData = ref({
  oldPwd: '',
  newPwd: '',
  rePwd: '',
})
const rules = {
  oldPwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    // 与原密码不一致
    {
      validator(rule, value, callback) {
        if (value === formData.value.oldPwd) {
          callback(new Error('新密码不能与旧密码相同'));
        } else {
          callback();
        }
      }
    }
  ],
  rePwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    // 与新密码一致
    {
      validator(rule, value, callback) {
        if (value !== formData.value.newPwd) {
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
  await userUpdatePasswordApi(formData.value)
  ElMessage.success('密码修改成功')
  // 修改完成后退出登录
  userStore.logout()
  router.replace('/login')
}

const handleReset = async () => {
  formRef.value.resetFields();
}

</script>

<template>
  <pageContainer title="重置密码">
    <el-form
      :model="formData"
      :rules="rules"
      label-width="100px"
      ref="formRef"
      @submit.native.prevent
      style="width: 50%;"
    >
      <el-form-item
        prop="oldPwd"
        label="旧密码"
      >
        <el-input
          v-model="formData.oldPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="newPwd"
        label="新密码"
      >
        <el-input
          v-model="formData.newPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="rePwd"
        label="确认新密码"
      >
        <el-input
          v-model="formData.rePwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit"
        >提交</el-button>
        <el-button
          type="default"
          @click="handleReset"
        >重置</el-button>

      </el-form-item>
    </el-form>
  </pageContainer>
</template>

<style></style>
