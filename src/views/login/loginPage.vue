<script setup>
import { reactive, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useUserStore } from '@/stores'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userRegisteApi, userLoginApi } from '@/api/user'
import { userResetPasswordApi } from '@/api/user'

const userStore = useUserStore()
const route = useRoute()

// 模式，登录or注册
const mode = ref(route.query.mode || 'login')
nextTick(() => {
  boxin.value.style.left = mode.value === 'registe' ? '-100%' : '0'
})
// 切换模式 登录/注册
function changeMode() {
  if (mode.value === 'login') {
    mode.value = 'registe'
    formRefR.value.resetFields()
    boxin.value.style.left = '-100%'
  } else {
    mode.value = 'login'
    formRefL.value.resetFields()
    boxin.value.style.left = '0'
  }
}

// 表单数据
const formRefL = ref(null)
const formRefR = ref(null)
const boxin = ref(null)
const formL = reactive({
  username: '',
  password: ''
})
const formR = reactive({
  username: '',
  password: '',
  rePassword: ''
})

// 校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,9}$/,
      message: '必须为6-10位数字或字母',
      trigger: ['blur']
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,9}$/,
      message: '必须为6-10位数字或字母',
      trigger: 'blur'
    }
  ],
  rePassword: [
    {
      validator: (rule, value, callback) => {
        if (mode.value === 'registe' && value !== formR.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 注册
const registe = async () => {
  await formRefR.value.validate()
  await userRegisteApi(formR)
  ElMessage.success('注册成功')
  const username = formR.username
  changeMode()
  formL.username = username
}

// 登录
const login = async () => {
  try {
    await formRefL.value.validate()
    const res = await userLoginApi(formL)
    userStore.setToken('Bearer ' + res.data.token)

    ElMessage.success('登录成功')
    setTimeout(() => {
      router.replace('/article/channel')
    }, 100)
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
  if (!formL.username) return ElMessage.warning('请输入用户名')
  await userResetPasswordApi(formL)
  ElMessage.success('密码重置成功，初始密码为六个1')
}
</script>

<template>
  <div>
    <div class="bg" @click="testFn">
      <div class="boxout">
        <div class="boxin" ref="boxin">
          <div class="login">
            <h3 class="title">登录</h3>
            <br />
            <el-form ref="formRefL" :model="formL" :rules="rules" label-width="auto">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="formL.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="formL.password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <div class="remenber">
                  <el-checkbox label="记住我" />
                  <p class="resetPwd" @click="resetPwd">忘记密码</p>
                </div>
              </el-form-item>
              <el-button @click.prevent="login" class="btn" type="primary" :plain="false"
                >登录</el-button
              >
              <p @click="changeMode" class="changeMode">注册→</p>
            </el-form>
          </div>
          <div class="registe">
            <h3 class="title">注册</h3>
            <br />
            <el-form ref="formRefR" :model="formR" :rules="rules" label-width="auto">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="formR.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="formR.password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item prop="password" label="确认密码">
                <el-input v-model="formR.rePassword" type="password" placeholder="请再次输入密码" />
              </el-form-item>
              <el-button @click.prevent="registe" class="btn" type="primary" :plain="false"
                >注册</el-button
              >
              <p @click="changeMode" class="changeMode">←登录</p>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg {
  background:
    url(@/assets/logo.png) no-repeat center,
    linear-gradient(#22002255),
    url(@/assets/login_bg1.jpg) no-repeat center;
  background-size:
    100%,
    100%,
    auto 100%;
  height: 100vh;
  width: 50vw;
  border-radius: 0 30px 30px 0;
  transition: all 0.1s linear;
  user-select: none;

  .login,
  .registe {
    padding: 4vmax;
    position: relative;
    width: 30vw;
    display: inline-block;
    vertical-align: top;
  }
  .boxout {
    width: 30vw;
    overflow: hidden;
    white-space: nowrap;
    border: 1px #46f solid;
    box-shadow: 2px 2px 3px #46f;
    border-radius: 10px;
    position: relative;
    left: 75vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    transition: all 0.1s linear;
  }
  .boxin {
    transition: all 0.2s linear;
    position: relative;
  }
  .title {
    margin: 10px;
  }
  .btn {
    width: 100%;
    height: 5vh;
    margin: 20px auto;
  }
  .remenber {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2px 10px;

    .resetPwd {
      cursor: pointer;
    }
  }
  .changeMode {
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .bg {
    width: 100vw;
    background-position:
      50% 10%,
      center,
      center;
    background-size:
      50%,
      100%,
      auto 100%;
    border-radius: 0;

    .boxout {
      left: 50vw;
      width: 80vw;
      background: #eeeeffaa;

      .login,
      .registe {
        width: 80vw;
      }
    }
  }
}
</style>
