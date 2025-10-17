import request from '@/utils/request'

// 获取用户列表
export const usersGetListApi = () => request.get('/api/users')

// 设置用户权限
export const usersSetRoleApi = (id) => request.post('/', { id })
