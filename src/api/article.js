import request from '@/utils/request'

// 获取文章分类
export const artGetChannels = () => request.get('my/cate/list')

// 添加分类
export const artAddChannel = data => request.post('my/cate/add')

// 编辑分类
export const artEditChannel = data => request.put('my/cate/info', data)

// 删除分类
export const artDeleteChanne = id => request.delete('my/cate/del' + id)

// 获取文章列表
export const artGetArticle = params => request.get('my/article/list', { params })

// 发布文章
export const publishArticle = data => request.post('/my/article/add', data)

// 获取文章详情
export const artGetDetail = id => request.get('my/article/info' + id)

// 编辑文章
export const editArticleService = data => request.put('my/article/info', data)
