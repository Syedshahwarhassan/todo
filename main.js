import { app, BrowserWindow } from "electron";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        minWidth: 320,
        minHeight: 480,
        alwaysOnTop: true,
        title: "Shahwar Todo List",
        resizable: false,
        webPreferences: {
            contextIsolation: true, 
            enableRemoteModule: false,
            preload: `${__dirname}/preload.js`, 
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    mainWindow.setMenuBarVisibility(false);
};


app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
