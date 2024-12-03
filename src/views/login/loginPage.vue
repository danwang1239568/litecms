<script setup>
import {
  reactive,
  ref,
  watch
} from 'vue';
import {
  User,
  Lock
} from '@element-plus/icons-vue'
import {
  ElMessage
} from 'element-plus'
import {
  userRegiste,
  userLogin
} from '@/api/user.js'
import {
  useUserStore
} from '@/stores';
import router from '@/router';

const userStore = useUserStore()

let isregiste = ref(0) //0显示登录，1显示注册
const rules = reactive({
  username: [{
    required: true,
    message: '必填',
    trigger: 'change'
  }, {
    min: 6,
    max: 10,
    message: '6-10位',
    trigger: 'blur'
  }, {
    pattern: /^[a-zA-Z0-9]*$/,
    message: '必须为数字和字母',
    trigger: ['blur', 'change']
  }],
  password: [{
    required: true,
    message: '必填',
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
    trigger: 'blur'
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
  isregiste.value = isregiste.value == 0 ? 1 : 0
  formRef.value.resetFields()
}

// 注册
const registe = async () => {
  await formRef.value.validate()
  await userRegiste(form)
  ElMessage.success('注册成功')
  isregiste.value = 0
}

// 登录
const login = async () => {
  await formRef.value.validate()
  // const res = await userLogin(form) // 接口不支持HTTPS
  // userStore.setToken(res.data.token)
  userStore.setToken('tempToken')
  userStore.setUser({
    username: 'danwang',
    id: 1,
    nickname: 'admin',
    email: 'admin@123.com',
    user_pic: ''
  })
  ElMessage.success('登录成功')
  setTimeout(() => {
    setTimeout(() => {
      router.replace('/article/channel')
    }, 1000);
    router.replace('/article/channel')
  }, 1000);

  // userStore.getUser()
}

// 测试用
import axios from 'axios';
const testFn = async () => {
  userStore.setToken('tempToken')
  // axios.post('http://big-event-vue-api-t.itheima.net/api/login', form).then(res => {
  //   console.log(res);
  // })
  // axios.get('https://ku.qingnian8.com/dataApi/news/navlist.php').then(res => {
  //   console.log(res);
  // })
  // ElMessage({
  //   message: 'Congrats, this is a success message.',
  //   type: 'success'
  // })
  // axios.post('http://big-event-vue-api-t.itheima.net/api/reg', form).then(res => {
  //   console.log(res);
  // })
}
</script>

<template>
  <el-row>
    <el-col :span="12">
      <div class="bg" @click="testFn"></div>
    </el-col>
    <el-col :span="6" :push="3">
      <el-form class="form" :model="form" ref="formRef" :rules="rules" v-if="isregiste == 0">
        <h2>登录</h2>
        <el-form-item class="ipt" prop="username">
          <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item class="ipt" prop="password">
          <el-input v-model="form.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item>
          <div class="remenber">
            <el-checkbox label="记住我" />
            <p>忘记密码</p>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="btn" type="primary">登录</el-button>
        </el-form-item>
        <p @click="changeMode">注册→</p>
      </el-form>

      <el-form class="form" :model="form" ref="formRef" :rules="rules" v-if="isregiste == 1">
        <h2>注册</h2>
        <el-form-item class="ipt" prop="username">
          <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item class="ipt" prop="password">
          <el-input v-model="form.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" :prefix-icon="Lock" placeholder="请再次输入密码" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="registe">注册</el-button>
        </el-form-item>
        <p @click="changeMode">←返回</p>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.bg {
  background: url(@/assets/logo.png) no-repeat center,
    url(@/assets/login_bg.jpg) no-repeat center;
  background-size: 40%, auto;
  height: 98vh;
  border-radius: 0 30px 30px 0;
}

.form {
  padding: 200px 0;

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
