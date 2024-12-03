<script setup>
import pageContainer from '@/components/pageContainer.vue';
import { Plus, Upload } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { userUpdateAvatar } from '@/api/user';

const userStore = useUserStore();

const imgUrl = ref(userStore.user.user_pic);
const uploadRef = ref();
const handleAvatarChange = (file) => {
  imgUrl.value = URL.createObjectURL(file.raw);
}
const onUpdateAvatar = async () => {
  // await userUpdateAvatar(imgUrl.value);
  await userStore.getUser()
  ElMessage.success('头像更新成功');
}

</script>

<template>
  <pageContainer title="更换头像">
    <el-upload class="avatar-uploader" ref="uploadRef" :auto-upload="false" :show-file-list="false"
      :on-change="handleAvatarChange">
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>

    <el-button @click="uploadRef.$el.querySelector('input').click()" :icon="Plus" type="primary"
      size="large">选择图片</el-button>
    <el-button @click="onUpdateAvatar" :icon="Upload" type="success" size="large">上传图片</el-button>
  </pageContainer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  width: 260px;
  height: 260px;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
  overflow: hidden;

  .avatar-uploader-icon {
    width: 260px;
    height: 260px;
  }

  .avatar {
    height: 260px;

  }
}
</style>
