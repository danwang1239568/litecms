<script setup>
import { User, Crop, EditPen, CaretBottom, SwitchButton, Menu } from '@element-plus/icons-vue'
import { useUserStore, useRouterStore } from '@/stores'
import { ref, onMounted } from 'vue'
import defaultAvatar from '@/assets/default.png'
import router from '@/router'
import { ElMessage } from 'element-plus'
import menuBar from './menuBar.vue'
import { resetRouter } from '@/router'

const routerStore = useRouterStore()
const userStore = useUserStore()
const avatarSrc = ref(userStore.user.user_pic || defaultAvatar)
const visible = ref(false)
const showMenuDrawer = ref(false)

// 弹出框命令
const handleCommand = (path) => {
  if (path) router.push('/user/' + path)
  else
    ElMessageBox({
      message: '确定要退出登录吗?',
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      userStore.logout()
      router.push('/login')
      routerStore.resetRouter()
    })
}

onMounted(async () => {
  const userStore = useUserStore()
  if (!userStore.user?.role) {
    await userStore.getUser()
    routerStore.generateRoutes()
  }
})
</script>

<template>
  <el-row class="layout">
    <el-col :sm="4" :xs="0">
      <menuBar />
    </el-col>
    <el-drawer v-model="showMenuDrawer" :with-header="false" direction="ltr" size="60%">
      <menuBar @change="showMenuDrawer = false" />
    </el-drawer>

    <el-col :sm="20" :xs="24">
      <div class="header">
        <el-icon :size="16" class="menu-icon" @click="showMenuDrawer = true"><Menu /></el-icon>
        <span>{{ userStore.user.username || '用户名称错误' }}</span
        ><span v-if="userStore.user.nickname" class="myname">: {{ userStore.user.nickname }}</span>
        <div class="avatar" @mouseover="visible = true">
          <el-dropdown @command="handleCommand">
            <div class="avatar">
              <el-avatar :size="40" :src="userStore.user.avatar || avatarSrc" />
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
                <el-dropdown-item command="password">
                  <el-icon>
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
.layout {
  height: 100vh;
  overflow: hidden;
}

::v-deep .el-drawer__body {
  padding: 0;
}

.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background-size: 40px;

  .menu-icon {
    display: none;
    margin-right: 10px;
  }

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
  height: calc(100% - 60px);
  background-color: #eee;
}

@media (max-width: 768px) {
  .header .menu-icon {
    display: inline-block;
  }
}
</style>
