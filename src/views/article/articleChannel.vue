<script setup>
import {
  ref
} from 'vue'
import {
  artDeleteChanne,
  artGetChannels
} from '@/api/article'
import {
  EditPen,
  Delete
} from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus';

const isLoading = ref(false)
const channelList = ref([])
const getChannelList = async () => {
  isLoading.value = true
  setTimeout(() => {
    channelList.value = [{
      id: 1,
      cate_name: '新闻',
      cate_alias: 'news'
    },
    {
      id: 2,
      cate_name: '热点',
      cate_alias: 'hot'
    },
    {
      id: 3,
      cate_name: '程序员',
      cate_alias: 'worker'
    },
    {
      id: 4,
      cate_name: '美女',
      cate_alias: 'girl'
    }
    ]
    // channelList.value = []
    isLoading.value = false
  }, 1000)

  // const res = await artGetChannels()
  // channelList.value = res.data.data

}
getChannelList()

const deleteItem = async obj => {
  await ElMessageBox.confirm('确定要删除吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  channelList.value.splice(obj.$index, 1)
  ElMessage.success('删除成功')
  // awiat artDeleteChanne()
  // getChannelList()
}
const dialog = ref()
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open()
}

const onSuccess = (isEdit, formData) => {
  // getChannelList()
  isEdit ? channelList.value = channelList.value.map(item => {
    return item.id === formData.id ? formData : item
  })
    : channelList.value.push({
      ...formData,
      id: new Date().now
    })
}
</script>

<template>
  <pageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="isLoading" :data="channelList">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column prop="" label="操作">
        <template #default="obj">
          <el-button @click="onEditChannel(obj.row)" plain type="primary" circle :icon="EditPen"></el-button>
          <el-button @click="deleteItem(obj)" plain type="danger" circle :icon="Delete"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channelEdit ref="dialog" @success="onSuccess"></channelEdit>

  </pageContainer>
</template>
