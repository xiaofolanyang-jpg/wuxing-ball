/* main.js — 启动入口：绑定配置、初始化各模块、启动 UI */
window.addEventListener("DOMContentLoaded", function () {
  // 绑定全局配置
  window.State.bindConfig(window.CONFIG);
  window.Story.bindConfig(window.CONFIG);
  window.Engine.bindConfig(window.CONFIG);
  window.UI.bindConfig(window.CONFIG);
  // 合并剧情数据
  window.Story.init();
  // 初始化 UI（内部会检测存档并启动）
  window.UI.init();
});
