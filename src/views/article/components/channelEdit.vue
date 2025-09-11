<script setup>
import {
  ref,
  defineExpose
} from 'vue';
import {
  defineEmits
} from 'vue';
import {
  artAddChannelApi,
  artEditChannelApi
} from '@/api/article';

const dialogVisible = ref(false)

const formData = ref({
  id: '',
  name: '',
  alias: ''
})

const open = (row) => {
  dialogVisible.value = true
  console.log(formData.value)
  if (row) {
    formData.value = {
      id: row.id,
      name: row.name,
      alias: row.alias
    }
  } else {
    formData.value = {
      id: '',
      name: '',
      alias: ''
    }
  }
}
defineExpose({
  open
})

const rules = {
  name: [{
    required: true,
    message: '不能为空',
    trigger: 'blur'
  },
  {
    max: 10,
    message: '不超过10位',
    trigger: 'blur'
  }
  ],
  alias: [{
    required: true,
    message: '不能为空',
    trigger: 'blur'
  },
  {
    pattern: /^[a-zA-Z0-9]{1,15}$/,
    message: '只能为1-15位数字和字母',
    trigger: 'blur'
  }]
}
const formRef = ref()
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formData.value.id
  if (isEdit) {
    // 服务器异常时本地编辑
    await artEditChannelApi(formData.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelApi(formData.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success', isEdit, formData.value)
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formData.id ? '修改分类' : '添加分类'"
    width="500"
    align-center
  >
    <template #footer>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        style="padding: 0 40px;"
      >
        <el-form-item
          prop="name"
          label="分类名称"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="alias"
          label="分类别名"
        >
          <el-input
            v-model="formData.alias"
            placeholder="请输入分类别名"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style></style>
