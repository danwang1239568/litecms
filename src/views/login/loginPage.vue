<script setup>
import {
  reactive,
  ref
} from 'vue';
import {
  User,
  Lock
} from '@element-plus/icons-vue'
import {
  ElMessage, ElMessageBox
} from 'element-plus'
import {
  userRegisteApi,
  userLoginApi
} from '@/api/user'
import {
  useUserStore
} from '@/stores';
import router from '@/router';
import { userResetPasswordApi } from '@/api/user';

const userStore = useUserStore()

const mode = ref('login') //0显示登录，1显示注册
const rules = reactive({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'change'
  }, {
    min: 6,
    max: 10,
    message: '必须为6-10位数字或字母',
    trigger: 'blur'
  }, {
    pattern: /^[a-zA-Z0-9]*$/,
    message: '必须为6-10位数字或字母',
    trigger: ['blur', 'change']
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'change'
  }, {
    min: 6,
    max: 10,
    message: '6-10位',
    trigger: 'blur'
  }],
  repassword: [{
    validator: (rule, value, callback) => {
      if (value !== form.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  }]
})

const form = reactive({
  username: '',
  password: '',
  repassword: ''
})

// 切换登录和注册的显示
const formRef = ref(null)
const changeMode = () => {
  mode.value = mode.value === 'login' ? 'registe' : 'login'
  formRef.value.resetFields()
}

// 注册
const registe = async () => {
  await formRef.value.validate()
  await userRegisteApi(form)
  ElMessage.success('注册成功')
  mode.value = 'login'
}

// 登录
const login = async () => {
  try {
    await formRef.value.validate()
    const res = await userLoginApi(form)
    userStore.setToken('Bearer ' + res.data.token)

    ElMessage.success('登录成功')
    setTimeout(async () => {
      await router.replace('/article/channel')
    }, 1000);
  } catch (err) {
    console.log(err)
  }
}

// 忘记密码
const resetPwd = async () => {
  await ElMessageBox({
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    message: '确定要重置密码吗？'
  })
  if (!form.username) return ElMessage.warning('请输入用户名')
  await userResetPasswordApi(form)
  ElMessage.success('密码重置成功，初始密码为六个1')
}

</script>

<template>
  <el-row>
    <el-col :span="12">
      <div
        class="bg"
        @click="testFn"
      ></div>
    </el-col>
    <el-col
      :span="8"
      :push="2"
    >
      <el-form
        class="form"
        :model="form"
        ref="formRef"
        :rules="rules"
        v-if="mode==='login'"
      >
        <h2>登录</h2>
        <el-form-item
          class="ipt"
          prop="username"
        >
          <el-input
            v-model="form.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          class="ipt"
          prop="password"
        >
          <el-input
            v-model="form.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <div class="remenber">
            <el-checkbox label="记住我" />
            <p @click="resetPwd">忘记密码</p>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="btn"
            type="primary"
          >登录</el-button>
        </el-form-item>
        <p @click="changeMode">注册→</p>
      </el-form>

      <el-form
        class="form"
        :model="form"
        ref="formRef"
        :rules="rules"
        v-else
      >
        <h2>注册</h2>
        <el-form-item
          class="ipt"
          prop="username"
        >
          <el-input
            v-model="form.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          class="ipt"
          prop="password"
        >
          <el-input
            v-model="form.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
          />
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="form.repassword"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click="registe"
          >注册</el-button>
        </el-form-item>
        <p @click="changeMode">←返回</p>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
  .bg {
    background: url(@/assets/logo.png) no-repeat center,
      linear-gradient(#22002233),
      url(@/assets/login_bg1.jpg) no-repeat center;
    background-size: 60%, 100%, auto 100%;
    height: 98vh;
    border-radius: 0 30px 30px 0;
    height: 100vh;
  }

  .form {
    margin: 20vh 0;
    padding: 4vw;
    border: 1px #46f solid;
    box-shadow: 2px 2px 3px #46f;
    border-radius: 10px;

    h2 {
      margin: 20px 0;
    }

    .ipt {
      margin: 15px 2px;
    }

    .remenber {
      padding: 0 10px;
      width: 800px;
      display: flex;
      justify-content: space-between;
    }

    .btn {
      width: 100%;
      margin: 20px 0;
    }

    p {
      font-size: 15px;
      cursor: pointer;
    }
  }
</style>
