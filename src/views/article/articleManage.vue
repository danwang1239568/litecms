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
    artGetArticle
  } from '@/api/article';
  import {
    formatTime
  } from '@/utils/format.js'
  import articleEdit from './components/articleEdit.vue'

  const selState = ref()
  const selName = ref()
  const articleList = ref([])
  const total = ref(0)
  const params = ref({
    pagenum: 1,
    pagesize: 6,
    cate_id: null,
    state: ''
  })
  const channelList = ref([{
    id: 1,
    cate_name: '新闻',
    cate_alias: 'news'
  }, {
    id: 2,
    cate_name: '热点',
    cate_alias: 'hot'
  }, {
    id: 3,
    cate_name: '程序员',
    cate_alias: 'worker'
  }, {
    id: 4,
    cate_name: '游戏',
    cate_alias: 'game'
  }, {
    id: 5,
    cate_name: '日常',
    cate_alias: 'life'
  }])
  const loading = ref(false)
  const getArticleList = async () => {
    loading.value = true
    articleList.value = []
    let i = 0
    while (true) {
      articleList.value.push(i % 2 === 0 ? {
        id: Date.now(),
        title: '我爱学习! ' + i,
        pub_date: '2024-12-1 12:30:30.300',
        state: '草稿',
        cate_name: '日常'
      } : {
        id: Date.now(),
        title: '原神,启动! ' + i,
        pub_date: '2024-12-1 12:30:30.300',
        state: '已发布',
        cate_name: '游戏'
      })
      let selChannel = channelList.value.find(item => item.id == params.value.cate_id)
      articleList.value = articleList.value.filter(item => {
        if (params.value.state) {
          if (selChannel) {
            return ((item.state == params.value.state) && (item.cate_name == selChannel.cate_name)) // 两条件满足
          }
          return item.state == params.value.state // 只选了状态
        } else {
          if (selChannel) {
            return item.cate_name == selChannel.cate_name // 只选了分类
          }
          return true
        }
      })
      i++
      if (articleList.value.length >= params.value.pagesize) break;
      if (i >= 100) break
    }
    setTimeout(() => loading.value = false, 400)

    /*
        articleList.value = [{
          id: 1,
          title: '新的文章啊',
          pub_date: '2024-12-1 12:30:30.300',
          state: '草稿',
          cate_name: '体育'
        }]
    */
    // const res = await artGetArticle(params.value)
    // articleList.value = res?.data?.data
    // total.value = res?.data?.total
  }
  getArticleList()

  const handleSizeChange = size => {
    params.value.pagenum = 1
    params.value.pagesize = size
    getArticleList()
  }
  const handleCurrentChange = page => {
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

  const editItem = row => {
    drawerRef.value.open(row)
  }
  const onSuccess = () => {
    getArticleList()
  }
  const deleteItem = row => {

  }
</script>

<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">添加文章</el-button>
    </template>

    <el-form inline>
      <el-form-item label="文章分类:">
        <channelSelect v-model="params.cate_id" style="width: 160px;"></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state" style="width: 160px;">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset" type="">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" stripe v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="obj">
          {{ formatTime(obj.row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="editItem(row)" circle type="primary" plain :icon="EditPen"></el-button>
          <el-button @click="deleteItem(row)" circle type="danger" plain :icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" :page-sizes="[3,5,8,12]"
      :background="true" layout="jumper, total, sizes, prev, pager, next" :total="20" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" style="margin-top: 20px;justify-content: end;" />

    <articleEdit @success="onSuccess" ref="drawerRef"></articleEdit>

  </pageContainer>
</template>
