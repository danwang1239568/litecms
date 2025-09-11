<script setup>
import {
  ref
} from 'vue';
import {
  EditPen,
  Delete
} from '@element-plus/icons-vue'
import channelSelect from './components/channelSelect.vue'
import {
  artGetArticleApi
} from '@/api/article';
import {
  formatTime
} from '@/utils/format.js'
import articleEdit from './components/articleEdit.vue'
import { delArticleApi } from '@/api/article'

const selState = ref()
const selName = ref()
const articleList = ref([])
const total = ref(0)
const params = ref({
  cate_id: null,
  state: null,
  pagenum: 1,
  pagesize: 6,
})
const channelList = ref([])
const isLoading = ref(false)
const getArticleList = async () => {
  isLoading.value = true
  articleList.value = []

  const res = await artGetArticleApi(params.value)
  articleList.value = res?.data?.data?.articles
  total.value = res?.data?.data?.total

  let selChannel = channelList.value.find(item => item.id == params.value.cate_id)

  articleList.value = articleList.value.filter(item => {
    if (params.value.state) {
      if (selChannel) {
        return ((item.state === params.value.state) && (item.cate_name === selChannel.cate_name)) // 两条件满足
      }
      return item.state === params.value.state // 只选了状态
    } else {
      if (selChannel) {
        return item.cate_name === selChannel.cate_name // 只选了分类
      }
    }
    return item
  })
  isLoading.value = false
}
getArticleList()

const handleSizeChange = size => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const handleCurrentChange = page => {
  params.value.pagenum = page
  console.log(params.value)
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.state = ''
  params.value.cate_id = null
  params.value.pagenum = 1
  getArticleList()
}

const drawerRef = ref()
const onAddArticle = () => {
  drawerRef.value.open()
}

const getFormatTime = (pub_date) => {
  const res = formatTime(pub_date)
  if (res === 'Invalid Date') return pub_date
  return res
}

const editItem = row => {
  drawerRef.value.open(row)
}
const onSuccess = () => {
  getArticleList()
}
const deleteItem = async row => {
  await ElMessageBox.confirm('确定要删除吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await delArticleApi(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
</script>

<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button
        @click="onAddArticle"
        type="primary"
      >添加文章</el-button>
    </template>

    <el-form inline>
      <el-form-item label="文章分类:">
        <channelSelect
          v-model="params.cate_id"
          style="width: 160px;"
        ></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select
          v-model="params.state"
          style="width: 160px;"
        >
          <el-option
            label="已发布"
            value="已发布"
          ></el-option>
          <el-option
            label="草稿"
            value="草稿"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="onSearch"
          type="primary"
        >搜索</el-button>
        <el-button
          @click="onReset"
          type="default"
        >重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="articleList"
      stripe
      v-Loading="isLoading"
    >
      <el-table-column
        label="文章标题"
        prop="title"
      >
        <template #default="{ row }">
          <el-link
            type="primary"
            :underline="false"
          >{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="cate_name"
      ></el-table-column>
      <el-table-column
        label="发表时间"
        prop="pub_date"
      >
        <template #default="obj">
          {{ getFormatTime(obj.row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="state"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            @click="editItem(row)"
            circle
            type="primary"
            plain
            :icon="EditPen"
          ></el-button>
          <el-button
            @click="deleteItem(row)"
            circle
            type="danger"
            plain
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3,5,8,12]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px;justify-content: end;"
    />

    <articleEdit
      @success="onSuccess"
      ref="drawerRef"
    ></articleEdit>

  </pageContainer>
</template>
