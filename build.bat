@echo off
echo ====== 考研数学学习地图 - 一键打包 ======
echo 前提：已安装 Node.js (https://nodejs.org)
echo.
echo [1/3] 生成各科目页面...
call node build.js
echo [2/3] 安装依赖（首次较慢）...
call npm install
if errorlevel 1 ( echo 安装失败，请检查 Node.js 与网络。 & pause & exit /b 1 )
echo [3/3] 打包 Windows 安装包...
call npm run dist:win
if errorlevel 1 ( echo 打包失败。 & pause & exit /b 1 )
echo.
echo 完成！安装包在 dist\ 文件夹（找 .exe）。
pause
