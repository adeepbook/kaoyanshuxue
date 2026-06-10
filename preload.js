// preload.js —— 把主进程的 AI 代理安全地暴露给界面
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aiAPI', {
  // 界面调用：await window.aiAPI.call(cfg, system, messages) -> string
  call: (cfg, system, messages) => ipcRenderer.invoke('ai-call', { cfg, system, messages })
});
