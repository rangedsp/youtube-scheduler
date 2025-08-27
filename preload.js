const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	sendSchedule: (data) => ipcRenderer.send("schedule:submit", data),
	onScheduleReply: (callback) =>
		ipcRenderer.on("schedule:reply", (event, msg) => callback(msg)),
});
