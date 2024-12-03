<script setup>
import {
  ref,
  defineExpose, defineEmits
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
  artGetDetail,
  publishArticle,
  editArticleService
} from '@/api/article';
import {
  ElMessage
} from 'element-plus';

const emit = defineEmits(['success'])
const drawerVisible = ref(false)
const editRef = ref()
const drawerTitle = ref('')
const open = async row => {
  console.warn('这个报错解决不掉啊！！！el-drawer组件只要弹出就报这个错');
  drawerVisible.value = true
  drawerTitle.value = row ? '编辑文章' : '发布文章'
  formModel.value.title = row ? row.title : ''
  formModel.value.content = ''
  imgUrl.value = ''
  editRef.value.setHTML('')
  // const res = await artGetDetail(formModel.value.cate_id)
}
defineExpose({
  open
})

const formModel = ref({
  cate_id: 1,
  content: '',
  cover_img: '',
  state: '',
  title: ''
})

const imgUrl = ref('')
const imgChange = uploadFile => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  console.log(imgUrl.value);
}
const imgRemove = () => {
  imgUrl.value = ''
}

// 表单数据转换成formdata对象
const fd = new FormData()
for (let key in formModel.value) {
  fd.append(key, formModel.value[key])
}
const onPublish = async state => {
  formModel.value.state = state
  if (formModel.value.cate_id) {
    // 编辑
    ElMessage.success('编辑成功 (暂不支持喵)')
    // const res = await editArticleService(fd)
    // console.log(res);
  } else {
    // 添加
    ElMessage.success('发布成功 (暂不支持喵)')
    // const res = await publishArticle(fd)
    // console.log(res);
  }
  drawerVisible.value = false
  emit('success')
}
</script>

<template>
  <!--  :modelValue="drawerVisible" @close="drawerVisible=false" -->
  <el-drawer v-model="drawerVisible" :title="drawerTitle" size="40%">
    <el-form :model="formModel">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>

      <el-form-item label="文章分类">
        <channelSelect></channelSelect>
      </el-form-item>

      <el-form-item label="文章封面">
        <el-upload :on-remove="imgRemove" :show-file-list="false" :on-change="imgChange" :auto-upload='false'
          class="avatar-uploader">
          <img v-if="imgUrl" :src="imgUrl" class="avatar-uploader-img" />
          <el-icon v-else class="avatar-uploader-icon" size="30">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容">
        <div class="editor">
          <quill-editor v-model:content="formModel.content" ref="editRef" content-type="html" theme="snow"
            class="editor"></quill-editor>
        </div>
      </el-form-item>

      <el-form-item label-width="80px">
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
