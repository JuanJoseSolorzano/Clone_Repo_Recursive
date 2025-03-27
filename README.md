# Git Clone Recursively - VSCode Extension

## Description

This Visual Studio Code extension allows users to clone a Git repository recursively. It provides a simple command that prompts the user for a repository URL and executes the `git clone` command with the `--recursive` option. This is particularly useful for repositories containing submodules.

## Features

- Clone a Git repository recursively, including all submodules.
- Provides a status bar item for quick access to the cloning functionality.
- Displays success or error messages based on the cloning operation.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for and select the command: **Clone Repo TA**.
3. Enter the repository URL when prompted.
4. The extension will execute the `git clone` command with the `--recursive` option.

Alternatively, you can use the status bar item:
- Click on the status bar item labeled `Clone Repo TA2` to trigger the cloning process.

## Installation

1. Clone this repository.
2. Open the folder in Visual Studio Code.
3. Run `npm install` to install dependencies.
4. Press `F5` to launch the extension in a new Extension Development Host window.

## Commands

| Command ID                | Description                          |
|---------------------------|--------------------------------------|
| `clonetarepo.CloneRepoTA` | Prompts the user to clone a repository recursively. |

## Status Bar Item

- **Text**: `$(repo-clone) Clone Repo TA2`
- **Tooltip**: `Click to clone a repository recursively`
- **Command**: `clonetarepo.CloneRepoTA`

## Error Handling

- If no repository URL is provided, an error message is displayed: `Repository URL is required to clone.`
- If the cloning process fails, an error message is displayed with the failure reason.

## Requirements

- Git must be installed and available in your system's PATH.

## License

This extension is licensed under the MIT License.
