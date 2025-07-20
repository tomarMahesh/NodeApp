const { contextBridge } = require('electron');

const backendUrl = new URL(window.location.href).searchParams.get('backend');

contextBridge.exposeInMainWorld('electron', {
  backendUrl
});