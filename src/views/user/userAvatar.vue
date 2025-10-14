<script setup>
import pageContainer from '@/components/pageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarApi } from '@/api/user'

const userStore = useUserStore()

const imgUrl = ref(userStore.user.avatar)
const uploadRef = ref(null)
let uploadRaw = null
const handleAvatarChange = (uploadFile) => {
  uploadRaw = uploadFile.raw
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
}
const onUpdateAvatar = async () => {
  const fd = new FormData()
  fd.append('avatar', uploadRaw)
  await userUpdateAvatarApi(fd)
  await userStore.getUser()
  ElMessage.success('头像更新成功')
}
</script>

<template>
  <pageContainer title="更换头像">
    <div class="box">
      <el-upload
        class="avatar-uploader"
        ref="uploadRef"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleAvatarChange"
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>

      <div class="btns">
        <el-button
          @click="uploadRef.$el.querySelector('input').click()"
          :icon="Plus"
          type="primary"
          size="large"
          >选择图片</el-button
        >
        <el-button @click="onUpdateAvatar" :icon="Upload" type="success" size="large"
          >上传图片</el-button
        >
      </div>
    </div>
  </pageContainer>
</template>

<style scoped lang="scss">
.box {
  overflow: hidden;
}
.avatar-uploader {
  width: 260px;
  height: 260px;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
  overflow: hidden;

  .avatar-uploader-icon {
    width: 100%;
    height: 100%;
  }

  .avatar {
    height: 260px;
  }
}

.btns {
  width: 260px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .box {
    padding: 6%;

    .avatar-uploader {
      margin: 0 auto;
      width: 200px;
      height: 200px;

      .avatar {
        height: 200px;
      }
    }

    .btns {
      width: 100%;
      justify-content: space-around;
    }
  }
}
</style>
