<script setup>
import { ref, defineExpose, defineEmits, nextTick } from 'vue'
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { artGetDetailApi, addArticleApi, editArticleApi } from '@/api/article'
import { ElMessage } from 'element-plus'
import { formatTime } from '@/utils/format'
import { useUserStore } from '@/stores'
import 'bytemd/dist/index.css'

import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/vue-next'

const userStore = useUserStore()

const formModel = ref({
  cate_id: '',
  cate_name: '',
  content: '',
  cover_img: '',
  state: '',
  title: ''
})

const emit = defineEmits(['success'])
const drawerVisible = ref(false)
const editRef = ref(null)
const drawerTitle = ref('')
const open = async (row) => {
  drawerTitle.value = row ? '编辑文章' : '发布文章'
  if (row) {
    // 编辑
    if (userStore.user.id !== row.auth_id && userStore.user.role !== 'admin') {
      return ElMessage.warning('你没有权限')
    }

    drawerVisible.value = true
    formModel.value.title = row?.title || ''
    formModel.value.cate_name = row?.cate_name || ''
    formModel.value.id = row?.id || '1'

    const res = await artGetDetailApi(row.id)
    formModel.value.cate_id = res?.data?.data?.cate_id
    formModel.value.content = res?.data?.data?.content || ''
    formModel.value.cover_img = res?.data?.data?.cover_img || ''
    nextTick(() => {
      editRef.value.setHTML(formModel.value.content)
    })
  } else {
    // 发布
    drawerVisible.value = true
    formModel.value = {
      cate_id: '',
      cate_name: '',
      content: '',
      cover_img: '',
      state: '',
      title: ''
    }
    nextTick(() => {
      console.log(editRef.value)
      editRef.value.setHTML('')
    })
  }
}
defineExpose({
  open
})

let uploadRaw = null
const imgChange = (uploadFile) => {
  uploadRaw = uploadFile.raw
  formModel.value.cover_img = URL.createObjectURL(uploadFile.raw)
}
const imgRemove = () => {
  uploadRaw = null
  formModel.value.cover_img = ''
}

// 确定
const onPublish = async (state) => {
  formModel.value.state = state
  // 表单数据转换成formdata对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (uploadRaw) {
    fd.set('cover_img', uploadRaw)
  }
  fd.delete('cate_name')
  fd.append('pub_date', formatTime(Date.now()))
  console.log(fd.get('pub_date'))
  if (drawerTitle.value === '编辑文章') {
    // 编辑
    const res = await editArticleApi(fd)
    console.log(res.data)
    ElMessage.success('编辑成功')
  } else {
    // 发布
    const res = await addArticleApi(fd)
    console.log(res.data)
    ElMessage.success('发布成功')
  }
  drawerVisible.value = false
  emit('success')
}

function contentChange(v) {
  formModel.value.content = v
}
</script>

<template>
  <!--  :modelValue="drawerVisible" @close="drawerVisible=false" -->
  <el-drawer v-model="drawerVisible" :title="drawerTitle" size="60%">
    <el-form :model="formModel" class="form">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>

      <el-form-item label="文章分类">
        <channelSelect v-model="formModel.cate_id"></channelSelect>
      </el-form-item>

      <el-form-item label="文章封面">
        <el-upload
          :on-remove="imgRemove"
          :show-file-list="false"
          :on-change="imgChange"
          :auto-upload="false"
          class="avatar-uploader"
        >
          <img v-if="formModel.cover_img" :src="formModel.cover_img" class="avatar-uploader-img" />
          <el-icon v-else class="avatar-uploader-icon" size="30">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容">
        <div class="editor">
          <Editor :value="formModel.content" @change="contentChange" :plugins="[gfm()]"></Editor>
        </div>
      </el-form-item>

      <el-form-item label-width="60px">
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  border: 1px solid #ababab;
  width: 100px;
  height: 100px;

  .avatar-uploader-icon {
    width: 100px;
    height: 100px;
  }

  .avatar-uploader-img {
    width: 100%;
  }
}

.form {
  padding: 5%;

  .editor {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .form {
    padding: 2%;
  }
}
</style>
