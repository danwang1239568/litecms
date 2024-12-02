import request from "@/utils/request";

// 注册   data: { username, password, repassword }
export const userRegiste = data => request.post('api/reg', data)
// export const userRegiste = ({ username, password, repassword }) => request.post('api/reg', { username, password, repassword })

// 登录
export const userLogin = ({ username, password }) => request.post('api/login', { username, password })

// 获取用户基本信息
export const userGetInfo = () => request.get('my/userinfo')

// 修改用户基本信息
export const userUpdateInfo = data => request.put('my/userinfo', data)

// 更新用户头像
export const userUpdateAvatar = avatar => request.patch('my/update/avatar', { avatar })

// 更新用户密码
export const userUpdatePassword = ({ old_pwd, new_pwd, re_pwd }) => request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
