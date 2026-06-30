# ⚡ Open File With – VSCode Extension

<div align="center">

[![Last Updated](https://img.shields.io/visual-studio-marketplace/last-updated/Solorzano-JuanJose.OpenFileWith)](https://github.com/JuanJoseSolorzano/OpenFileWith_Vscode_Extension)
[![Version](https://img.shields.io/visual-studio-marketplace/v/Solorzano-JuanJose.OpenFileWith)](https://marketplace.visualstudio.com/items/Solorzano-JuanJose.OpenFileWith)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/Solorzano-JuanJose.OpenFileWith)](https://marketplace.visualstudio.com/items?itemName=Solorzano-JuanJose.OpenFileWith) [![Downloads](https://img.shields.io/visual-studio-marketplace/d/Solorzano-JuanJose.OpenFileWith)](https://marketplace.visualstudio.com/items?itemName=Solorzano-JuanJose.OpenFileWith) [![Rating Star](https://img.shields.io/visual-studio-marketplace/stars/Solorzano-JuanJose.OpenFileWith)](https://marketplace.visualstudio.com/items?itemName=Solorzano-JuanJose.OpenFileWith&ssr=false#review-details)


</div>
<p align="center">
  <img src="./images/icon.png" alt="Extension Icon" width="350" height="350" />
</p>

A simple and fast way to **open files with your favorite tools** directly from the VSCode context menu.
Enhance productivity in VSCode with a customizable 'Open File With...' context menu to execute files using your preferred tools.

---

## ✨ Features

- 📂 Right-click a file → **Open File With...**
- ⚙️ Choose the tool you want to open it with.
- 🔌 Works with scripts, executables, and more.

---

## 📦 Installation

1. Open **VSCode**
2. Go to **Extensions** (`Ctrl+Shift+X`)
3. Search for **Open File With** or search for **JuanJose** 
4. Click **Install**

---

## 🖱️ Usage

1. Right-click any file in Explorer  
  ![Context Menu Example](./images/example02.png)  
2. Select **Open File With...**  
3. Choose your tool and open instantly ⚡
  ![Context Menu Example](./images/example03.png) 
4. You can also select the option in the editor context:
  ![Context Menu Example](./images/example01.png) 
---

## 🔧 Configuration

You can configure custom tools in your `settings.json`:
Go to settings and search for the extension name:

![Context Menu Example](./images/example04.png) 

Option: `Exec_Extensions` Here you can add the extension name of a executable file. Eg: .exe, .sh ...

Option: `Main_Configuration`: Define the programs to run a specific file. Eg: select 'Edit in settings.json and add new app:

```jsonc
"tdr-open-file-with.configuration": {
        
        ".html": [
            {
                "alias": "Google Chrome",
                "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            },
            {
                "alias": "Microsoft Edge",
                "path": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
            }
        ],
        ".xml": [
            {
                "alias": "Altova",
                "path": "C:\\LegacyApp\\Altova\\Authentic2006\\AUTHENTIC.exe"
            },
            {
                "alias": "InfoPath",
                "path": "C:\\Program Files\\Microsoft Office\\Office15\\INFOPATH.EXE"
            }
        ],
} 
```