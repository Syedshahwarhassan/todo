import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    sendData: (data) => ipcRenderer.send("send-data", data),
    onReceiveData: (callback) => ipcRenderer.on("receive-data", callback),
});
