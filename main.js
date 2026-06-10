// main.js —— Electron 主进程
// 负责：创建窗口、加载界面、代理 AI 请求（在 Node 端发请求，绕开浏览器 CORS）
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 820,
    title: '考研数学 · 学习进度地图',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile('index.html');
  // win.webContents.openDevTools(); // 调试时取消注释
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ============ AI 请求代理 ============
// 渲染进程通过 window.aiAPI.call(cfg, system, messages) 调用，这里在 Node 端真正发请求。
async function callProvider(cfg, system, messages) {
  const fmt = cfg.provider === 'gemini' ? 'gemini' : 'openai';
  if (cfg.provider !== 'builtin' && !cfg.key) throw new Error('未配置 API Key');

  if (fmt === 'gemini') {
    const url = cfg.baseUrl.replace(/\/$/, '') + '/models/' + cfg.model + ':generateContent';
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }))
      })
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error.message || 'Gemini 错误');
    return (d.candidates && d.candidates[0] && d.candidates[0].content.parts.map(p => p.text || '').join('')) || '(空响应)';
  }

  // OpenAI 兼容（DeepSeek / OpenAI / 自定义）
  const url = cfg.baseUrl.replace(/\/$/, '') + '/chat/completions';
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
    body: JSON.stringify({ model: cfg.model, messages: [{ role: 'system', content: system }, ...messages] })
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || '接口错误');
  return d.choices[0].message.content;
}

ipcMain.handle('ai-call', async (_e, { cfg, system, messages }) => {
  try {
    return await callProvider(cfg, system, messages);
  } catch (err) {
    throw new Error(err.message || String(err));
  }
});
