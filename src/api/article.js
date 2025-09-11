import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsApi = () => request.get('/my/cate/list')

// 添加分类
export const artAddChannelApi = data => request.post('my/cate/add', data)

// 编辑分类
export const artEditChannelApi = data => request.post('my/cate/set', data)

// 删除分类
export const artDeleteChanneApi = id => request.get(`my/cate/del/${id}`)

// 获取文章列表
export const artGetArticleApi = params => request.get('my/article/list', { params })

// 发布文章
export const addArticleApi = data => request.post('/my/article/list', data)

// 获取文章详情
export const artGetDetailApi = id => request.get(`my/article/detail/${id}`)

// 编辑文章
export const editArticleApi = data => request.post('my/article/detail', data)

// 删除文章
export const delArticleApi = id => request.get(`/my/article/delete/${id}`)
