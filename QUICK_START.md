# 🚀 快速启动指南

## 第一步：安装依赖

```bash
npm install
```

## 第二步：准备资源文件

### 图片资源
在 `public/images/` 目录下添加以下图片：

- `groom.jpg` - 新郎照片
- `bride.jpg` - 新娘照片  
- `couple-1.jpg` ~ `couple-4.jpg` - 4张合照
- `wedding-1.jpg` ~ `wedding-6.jpg` - 6张婚纱照

**注意**：如果没有图片，系统会自动使用占位图，但建议使用真实照片以获得最佳效果。

### 音乐资源
在 `public/music/` 目录下添加：

- `wedding-music.mp3` - 背景音乐文件

**注意**：如果没有音乐文件，音乐播放器按钮仍然会显示，但点击不会有声音。

## 第三步：自定义内容

### 修改新人信息
1. 打开 `src/components/Hero.jsx`
2. 修改第 15 行的 `Ming` 和第 20 行的 `Xin` 为新人的名字
3. 修改第 28 行的日期 `2025.10.20`

### 修改婚礼日期和时间
1. 打开 `src/components/Countdown.jsx`
2. 修改第 7 行的日期：`new Date('2025-10-20T10:00:00')`

2. 打开 `src/components/WeddingInfo.jsx`
3. 修改第 45 行的仪式时间
4. 修改第 60 行的宴席时间

### 修改婚礼地址
1. 打开 `src/components/WeddingInfo.jsx`
2. 修改第 9 行的地址字符串
3. 修改第 10 行的地图坐标（经纬度）

### 修改新人简介和时间线
1. 打开 `src/components/AboutUs.jsx`
2. 修改第 10-16 行的时间线数据
3. 修改第 30-35 行的新人简介

## 第四步：启动开发服务器

### 启动前端（终端 1）
```bash
npm run dev
```
访问 http://localhost:3000

### 启动 Mock API（终端 2，可选）
```bash
npm run mock
```
Mock API 运行在 http://localhost:3001

**注意**：如果不启动 Mock API，RSVP 和留言功能仍然可以正常显示，但数据不会保存。

## 第五步：构建生产版本

```bash
npm run build
```

构建完成后，`dist` 目录包含所有可部署的文件。

## 第六步：预览生产版本

```bash
npm run preview
```

## 🎨 样式自定义

### 修改主题颜色
编辑 `tailwind.config.js` 中的颜色配置：

```javascript
colors: {
  'rose-gold': {
    // 修改这里的颜色值
  },
  'cream': {
    // 修改这里的颜色值
  }
}
```

### 修改字体
编辑 `index.html` 中的 Google Fonts 链接，或修改 `tailwind.config.js` 中的字体配置。

## 📱 测试响应式

在浏览器中：
1. 打开开发者工具（F12）
2. 切换到设备模拟模式
3. 测试不同屏幕尺寸：
   - 手机（375px, 414px）
   - iPad（768px）
   - PC（1024px+）

## 🐛 常见问题

### 1. 图片不显示
- 检查图片路径是否正确
- 确认图片文件已放在 `public/images/` 目录
- 检查浏览器控制台是否有错误

### 2. 音乐不播放
- 确认音乐文件已放在 `public/music/` 目录
- 浏览器可能阻止自动播放，需要用户交互
- 检查浏览器控制台是否有错误

### 3. API 请求失败
- 确认 Mock API 服务器已启动（`npm run mock`）
- 检查端口 3001 是否被占用
- 如果不需要保存数据，可以忽略此错误

### 4. 构建失败
- 检查 Node.js 版本（建议 16+）
- 删除 `node_modules` 和 `package-lock.json`，重新运行 `npm install`
- 检查是否有语法错误

## 📦 部署

### Vercel 部署
1. 将代码推送到 GitHub
2. 访问 https://vercel.com
3. 导入仓库，自动部署

### Netlify 部署
1. 将代码推送到 GitHub
2. 访问 https://www.netlify.com
3. 导入仓库，自动部署

### 其他静态托管
1. 运行 `npm run build`
2. 将 `dist` 目录内容上传到你的托管服务

## ✅ 检查清单

部署前请确认：

- [ ] 所有图片已添加
- [ ] 背景音乐已添加（可选）
- [ ] 新人信息已更新
- [ ] 婚礼日期已更新
- [ ] 婚礼地址已更新
- [ ] 时间线内容已更新
- [ ] 已测试响应式布局
- [ ] 已测试所有功能
- [ ] 已构建生产版本并测试

---

祝您使用愉快！💐

