# taotao项目GitHub Pages部署指南

## 方法一：通过GitHub网页界面部署（最简单）

### 步骤1：创建GitHub仓库
1. 访问 [GitHub.com](https://github.com) 并登录
2. 点击右上角"+" → "New repository"
3. 输入仓库名称（如：taotao-baby）
4. 选择"Public"（GitHub Pages需要公开仓库）
5. 可选：添加README文件描述
6. 点击"Create repository"

### 步骤2：上传文件
1. 在仓库页面，点击"Add file" → "Upload files"
2. 将taotao文件夹中的所有文件拖拽到上传区域：
   - index.html
   - styles.css  
   - script.js
   - README.md
3. 点击"Commit changes"

### 步骤3：启用GitHub Pages
1. 进入仓库的"Settings"选项卡
2. 在左侧菜单中找到"Pages"
3. 在"Build and deployment"部分：
   - Source：选择"Deploy from a branch"
   - Branch：选择"main"分支，文件夹选择"/(root)"
4. 点击"Save"
5. 等待几分钟，页面会显示部署成功的URL

### 步骤4：访问网站
- 您的网站将在 `https://[您的用户名].github.io/[仓库名]` 上线
- 例如：`https://yourusername.github.io/taotao-baby`

## 方法二：通过Git命令行部署（推荐给开发者）

### 步骤1：初始化Git仓库
```bash
cd taotao
git init
git add .
git commit -m "Initial commit: baby growth website"
```

### 步骤2：连接到GitHub仓库
```bash
git remote add origin https://github.com/[您的用户名]/[仓库名].git
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages
按照方法一的步骤3操作

## 自定义域名（可选）

如果您有自己的域名：
1. 在域名注册商处添加CNAME记录，指向 `[您的用户名].github.io`
2. 在GitHub Pages设置中添加自定义域名
3. 在项目根目录创建 `CNAME` 文件，内容为您的域名

## 自动更新

GitHub Pages会自动部署每次推送到main分支的更改：
```bash
git add .
git commit -m "Update baby information"
git push origin main
```

## 注意事项

1. **文件命名**：确保主页面名为 `index.html`
2. **相对路径**：所有资源引用使用相对路径（如 `styles.css` 而不是 `/styles.css`）
3. **缓存问题**：部署后可能需要清除浏览器缓存才能看到最新版本
4. **HTTPS**：GitHub Pages自动提供HTTPS加密

## 故障排除

- 如果页面显示404，检查：
  - 仓库是否为public
  - 是否正确设置了GitHub Pages源
  - index.html文件是否在根目录
  - 等待几分钟让部署完成

## 进阶功能

您可以进一步扩展：
- 添加更多宝宝照片
- 实现相册滑动功能
- 添加成长日记板块
- 集成评论系统（使用Disqus等）

您的宝宝成长网站很快就会上线！ 🎉