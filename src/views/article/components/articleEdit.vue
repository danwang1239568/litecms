<script setup>
import {
  ref,
  defineExpose, defineEmits, nextTick
} from 'vue';
import channelSelect from './channelSelect.vue'
import {
  Plus
} from '@element-plus/icons-vue'
import {
  QuillEditor
} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artGetDetailApi,
  addArticleApi,
  editArticleApi
} from '@/api/article';
import {
  ElMessage
} from 'element-plus';
import { formatTime } from '@/utils/format'

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
const editRef = ref()
const drawerTitle = ref('')
const open = async row => {
  drawerVisible.value = true
  drawerTitle.value = row ? '编辑文章' : '发布文章'
  if (row) {
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
    formModel.value = {
      cate_id: '',
      cate_name: '',
      content: '',
      cover_img: '',
      state: '',
      title: '',
    }
    nextTick(() => {
      editRef.value.setHTML('')
    })
  }
}
defineExpose({
  open
})

let uploadRaw = null
const imgChange = uploadFile => {
  uploadRaw = uploadFile.raw
  formModel.value.cover_img = URL.createObjectURL(uploadFile.raw)
}
const imgRemove = () => {
  uploadRaw = null
  formModel.value.cover_img = ''
}

const onPublish = async state => {
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
    // 添加
    const res = await addArticleApi(fd)
    console.log(res.data);
    ElMessage.success('发布成功 (暂不支持喵)')
  }
  drawerVisible.value = false
  emit('success')
}
</script>

<template>
  <!--  :modelValue="drawerVisible" @close="drawerVisible=false" -->
  <el-drawer
    v-model="drawerVisible"
    :title="drawerTitle"
    size="40%"
  >
    <el-form :model="formModel">
      <el-form-item
        label="文章标题"
        prop="title"
      >
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
          :auto-upload='false'
          class="avatar-uploader"
        >
          <img
            v-if="formModel.cover_img"
            :src="formModel.cover_img"
            class="avatar-uploader-img"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
            size="30"
          >
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容">
        <div class="editor">
          <quill-editor
            v-model:content="formModel.content"
            ref="editRef"
            content-type="html"
            theme="snow"
            class="editor"
          ></quill-editor>
        </div>
      </el-form-item>

      <el-form-item label-width="80px">
        <el-button
          @click="onPublish('已发布')"
          type="primary"
        >发布</el-button>
        <el-button
          @click="onPublish('草稿')"
          type="info"
        >草稿</el-button>
      </el-form-item>

    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  border: 1px solid #ababab;
  width: 100px;

  .avatar-uploader-icon {
    width: 100px;
    height: 100px;
  }

  .avatar-uploader-img {
    width: 100%;
  }
}

.editor {
  width: 100%;
}
</style>
