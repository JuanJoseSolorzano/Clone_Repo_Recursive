# ⚡ [TDR] Clone With Submodules


<p align="left">
  <img src="./images/icon.png" alt="Extension Icon" width="280" height="280" />
</p>

Clone Git repositories with all submodules from inside VS Code.

The extension adds a status bar action that asks for a repository URL and destination folder, then runs a recursive clone.

---

## ✨ Features

- Clones using `git clone --recursive -j8`.
- Validates repository URL input.
- Lets you choose the parent directory before cloning.
- Shows cancellable progress while cloning.
- Offers to open the cloned repository when cloning finishes.

---

## 📦 Installation

### From VSIX (local/internal flow)

1. Download the latest `.vsix` package from the [Releases](https://github.vitesco.io/sg922674/git_with_submodules/releases) page.
2. Open VS Code.
3. Press `Ctrl+Shift+X` to open Extensions.
4. Select `...` in the top-right corner of Extensions.
5. Select `Install from VSIX...` and pick the file.

### Using `code` CLI

**PowerShell**
```bash
git clone --depth=1 https://github.vitesco.io/sg922674/git_with_submodules; C:\LegacyApp\VSCode\bin\code.cmd --install-extension git_with_submodules/tdr-clone-with-submodules.vsix; rm -Recurse -Force git_with_submodules
```
**Git Bash**
```bash
git clone --depth=1 https://github.vitesco.io/sg922674/git_with_submodules && C:\LegacyApp\VSCode\bin\code.cmd --install-extension tdr-clone-with-submodules/tdr-clone-with-submodules.vsix && rm -rf tdr-clone-with-submodules
```

---

## 🖱️ Usage

1. Click `$(repo-clone) [TDR] GitModules` in the status bar.
2. Enter a repository URL, for example `https://github.com/org/repo.git`.
3. Select the destination parent folder.
4. Wait for cloning to complete, then confirm whether to open the cloned project.

---

## 📄 License

See [LICENSE.md](./LICENSE.md).