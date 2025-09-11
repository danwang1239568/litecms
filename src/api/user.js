import request from "@/utils/request";

// 注册   data: { username, password, repassword }
export const userRegisteApi = data => request.post('api/reguser', data)

// 登录
export const userLoginApi = ({ username, password }) => request.post('api/login', { username, password })

// 获取用户基本信息
export const userGetInfoApi = () => request.get('my/userinfo')

// 修改用户基本信息
export const userUpdateInfoApi = data => request.post('my/userinfo', data)

// 更新用户头像
export const userUpdateAvatarApi = data => request.post('my/setavatar', data)

// 更新用户密码
export const userUpdatePasswordApi = data => request.post('/my/setpwd', data)

export const userResetPasswordApi = data => request.post('/api/resetpwd', data)
