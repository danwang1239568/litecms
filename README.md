# liteCMS

LiteCMS 将被用于管理个人博客的文章，此仓库为前端部分。

## 项目简介

基于 **Vue3** 实现的个人博客管理系统后台，提供完整的用户和文章管理功能：

- 用户登录、注册、忘记密码功能，并集成鉴权系统和动态路由  
- 系统仅允许管理员管理文章和分类，普通用户仅能修改个人信息  
- 支持文章发布、编辑、删除，文章分类筛选和分页  
- 优化前端代码，提高系统响应速度与用户体验  

## 技术栈

- **前端**：Vue3、Pinia、Element-UI、Vite、Axios、Sass  
- **后端**：Node.js、Express、JWT 权限验证  
- **部署**：Nginx 静态资源服务，前后端分离  

## 职责与亮点

- 独立完成前后端开发，实现完整的 CRUD 功能  
- 动态路由和鉴权系统保证不同角色访问权限  
- 前端优化打包配置，解决异步组件加载和资源路径问题  
- Nginx 配置反向代理，实现前后端接口分离



This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
