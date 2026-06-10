# 考研数学 · 学习进度地图（桌面版）

每个科目是**独立的一份**（高等数学 / 线性代数 / 概率论与数理统计），进度、笔记互不干扰。
知识点全标注数一 / 数三、可前置追溯、可配置多家 AI、可导出复盘资料。

## 文件结构（重要）
- `template.html` —— 引擎模板（界面 + 逻辑，唯一源头，**不直接打开**）
- `build.js` —— 全部知识点内容都在这里；运行它会**生成**下面这些页面
- `index.html` —— 首页（各科入口，显示进度）← 应用启动页
- `高等数学.html` / `线性代数.html` / `概率论与数理统计.html` —— 各科独立页面（由 build.js 生成）
- `main.js` / `preload.js` —— Electron 桌面壳（主进程代发 AI 请求，绕开 CORS）
- `build.bat` —— Windows 一键打包脚本

> 改内容 / 加科目：编辑 `build.js`（仿照已有科目加一个），再 `node build.js` 重新生成。引擎只在 template.html 一处，不重复。

## 出 exe（推荐）
1. 装 Node.js（https://nodejs.org，LTS）。
2. 双击 **build.bat**（自动：生成页面 → 装依赖 → 打包）。
3. 到 dist\ 找安装包（.exe）。

## 或用 Claude Code
在 VS Code 打开本文件夹，对 Claude Code 说：
> 这是一个 Electron 项目。先 node build.js 生成页面，再 npm install、npm run dist:win 打成 Windows 安装包，报错就修。

## 开发预览
  npm start      （= node build.js + electron .，启动到首页）
也可直接双击 index.html 在浏览器看；但浏览器会拦截第三方 AI 请求，AI 需在打包后的桌面应用里用。

## 配置 AI（右上「⚙ 模型」）
- DeepSeek：Base URL https://api.deepseek.com，模型 deepseek-v4-flash（快/省）/ deepseek-v4-pro（强）
- OpenAI：https://api.openai.com/v1，模型如 gpt-5.4-mini / gpt-5.5
- Gemini：模型如 gemini-3.5-flash
- 自定义：任意 OpenAI 兼容接口
界面顶部始终显示当前用的是哪个模型。Key 保存在本机。

## 导出复盘资料（右上「⬇ 导出复盘」）
把笔记 + 已「存入笔记」的 AI 解析，按知识点结构整理：
- 排版预览 / 存 PDF：新窗口打开排好版资料，点按钮打印或存 PDF
- 下载 Markdown：导出 .md，方便二次整理

## 数据
进度与笔记保存在本机，不上传。三角函数有完整预置图文作示范，其余知识点的精讲靠 AI / 自己补笔记。
