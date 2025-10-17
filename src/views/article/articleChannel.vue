<script setup>
import { ref } from 'vue'
import { artDeleteChanneApi, artGetChannelsApi } from '@/api/article'
import { EditPen, Delete } from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const isLoading = ref(false)
const channelList = ref([])
const getChannelList = async () => {
  isLoading.value = true
  const res = await artGetChannelsApi()
  channelList.value = res.data.data
  isLoading.value = false
}
getChannelList()

// 删除文章
const deleteItem = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除吗?', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
    channelList.value = channelList.value.filter((item) => item.id === row.id)
    ElMessage.success('删除成功')
    await artDeleteChanneApi(row.id)
    getChannelList()
  } catch (err) {
    console.log(err)
  }
}
const dialog = ref()

// 编辑分类
const onEditChannel = (row) => {
  dialog.value.open(row)
}

// 添加分类
const onAddChannel = () => {
  dialog.value.open()
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <pageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table
      v-loading="isLoading"
      :data="channelList"
      :header-cell-style="{ background: '#eee', textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      stripe
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="alias" label="分类别名" />
      <el-table-column prop="" label="操作" width="100">
        <template #default="obj">
          <el-button
            @click="onEditChannel(obj.row)"
            plain
            type="primary"
            circle
            :icon="EditPen"
          ></el-button>
          <el-button
            @click="deleteItem(obj.row)"
            plain
            type="danger"
            circle
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channelEdit ref="dialog" @success="onSuccess"></channelEdit>
  </pageContainer>
</template>

<style scoped></style>
