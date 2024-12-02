<script setup>
  import {
    Memo,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    CaretBottom,
    SwitchButton
  } from '@element-plus/icons-vue'
  import {
    useUserStore
  } from '@/stores';
  import {
    ref
  } from 'vue';
  import {
    onMounted
  } from 'vue';
  import {
    reactive
  } from 'vue';
  import defaultAvatar from '@/assets/default.png'
  import router from '@/router';
  import {
    ElMessage
  } from 'element-plus';

  const userStore = useUserStore()
  const avatarSrc = ref(userStore.user.user_pic || defaultAvatar)

  const visible = ref(false)
  // 弹出框命令
  const handleCommand = path => {
    if (path) router.push('/user/' + path)
    else ElMessageBox({
      message: '确定要退出登录吗?',
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(() => {
      userStore.removeToken()
      userStore.setUser({})
      router.push('/login')
    })
  }
</script>

<template>
  <el-row>
    <el-col :span="4">
      <div class="menu">
        <el-menu background-color="#222" text-color="#eee" default-active="/article/channel" router>
          <img class="logo" src="@/assets/logo.png" />
          <el-menu-item index="/article/channel">
            <el-icon>
              <Memo />
            </el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/article/manage">
            <el-icon>
              <Promotion />
            </el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile">
              <el-icon>
                <User />
              </el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon>
                <Crop />
              </el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon>
                <EditPen />
              </el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="header">
        <span>{{ userStore.user.nickname || '程序员' }}: </span><span class="myname">{{ userStore.user.username }}</span>
        <div class="avatar" @mouseover="visible=true">
          <el-dropdown @command="handleCommand">
            <div class="avatar">
              <el-avatar :size="40" :src="avatarSrc" />
              <el-icon size="20">
                <CaretBottom />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>基本资料</span>
                </el-dropdown-item>
                <el-dropdown-item command="avatar">
                  <el-icon>
                    <Crop />
                  </el-icon>
                  <span>更换头像</span>
                </el-dropdown-item>
                <el-dropdown-item command="password"><el-icon>
                    <EditPen />
                  </el-icon>
                  <span>重置密码</span>
                </el-dropdown-item>
                <el-dropdown-item command="">
                  <el-icon>
                    <SwitchButton />
                  </el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
  .menu {
    height: 96vh;
    background-color: #222;
    text-align: center;

    .logo {
      margin: 20px 0;
    }
  }

  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    background-size: 40px;

    .myname {
      font-weight: bold;
    }

    .avatar {
      display: flex;
      align-items: center;
      vertical-align: middle;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }

  .view {
    width: 100%;
    height: calc(96vh - 60px);
    background-color: #eee;
  }
</style>
