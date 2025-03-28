/***
 * Author: Solorzano, Juan Jose
 * Date: 05-May-2024
 * Description: This is a simple VSCode extension that allows users to clone a Git repository recursively.
 * It provides a command that prompts the user for a repository URL and then executes the git clone command.
 * Vscode does not have a built-in command for cloning a repository recursively, so this extension provides that functionality.
 */

import * as vscode from 'vscode';
import * as fs from 'fs'; // Importing the fs module to check if the directory is empty
import { exec } from 'child_process'; // Importing exec from child_process to execute shell commands

//NOTE: Activate function is the entry point of the extension. It's called when the extension is installed and activated.
// The command ID must match the one in package.json
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('clonewithsubmodule.CloneRepoRecursively', async () => {
		const repoUrl = await vscode.window.showInputBox({
			// Shows the input box in the command palette.
			prompt: 'Enter the repository URL to clone',
			placeHolder: 'https://github.com/user/repo.git'});
		
		if (!repoUrl || !isValidUrl(repoUrl)) {return;}
		// folder selection dialog
		const targetDir = await vscode.window.showOpenDialog({
			canSelectFolders: true,
			canSelectFiles: false,
			canSelectMany: false,
			openLabel: 'Select folder'
		});
		if (!targetDir || targetDir.length === 0) {return;} // the user cancel to clone
		const targetPath = targetDir[0].fsPath;
		const repoName = getRepoNameFromUrl(repoUrl);
		const finalPath = `${targetPath}/${repoName}`;
		if (!isDirectoryEmpty(targetPath) && fs.existsSync(finalPath)) {
			vscode.window.showErrorMessage('The selected directory already contains a folder with the same repository name. Please select a different directory.');
			return;
		}
		// Clone repository process.
		const cloneProcess = exec(`git clone --recursive ${repoUrl} "${finalPath}"`);
		vscode.window.showInformationMessage(`Cloning repository ${repoUrl} into ${finalPath}...`);
		// Store the process output in the output channel.
		cloneProcess.stdout?.on('data', (data) => {console.log(`stdout: ${data}`);});
		cloneProcess.stderr?.on('data', (data) => {console.error(`stderr: ${data}`);});
		cloneProcess.on('close', (code) => {
			if (code === 0) { // Successful clone
				vscode.window.showInformationMessage(`Repository cloned successfully into ${finalPath}`);
				vscode.window.showInformationMessage(
					"Would you like to open the cloned repository, or add it to the current workspace?",
					{ modal: true },
					'Open',
					'Open in New Window',
					'Add to Workspace',
					'Cancel'
				).then(selection => {
					if (selection === 'Open') {
						vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(finalPath), false);
					} else if (selection === 'Open in New Window') {
						vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(finalPath), true);
					} else if (selection === 'Add to Workspace') {
						vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: vscode.Uri.file(finalPath) });
					}});
			} else {// Failed clone
				vscode.window.showErrorMessage(`Failed to clone repository. Process exited with code ${code}`);
			}
		});
	});
	// Create and show the status bar item during activation
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = '$(repo-clone) Clone Submodules';
	statusBarItem.tooltip = 'Click to clone a repository recursively';
	statusBarItem.command = 'clonewithsubmodule.CloneRepoRecursively'; // Updated command ID
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);
	console.log('The extension "clonewithsubmodule" is now active!');
}

/**
 * Checks if the given string is a valid URL.
 * @param url - The string to validate as a URL.
 * @returns `true` if the string is a valid URL, otherwise `false`.
 */
function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}
/**
 * Check if the directory is empty.
 * @param path - The path to the directory to check.
 * @returns `true` if the directory is empty, otherwise `false`.
 */
function isDirectoryEmpty(path: string): boolean {
	try {
		const files = fs.readdirSync(path);
		return files.length === 0;
	} catch (error) {
		return false; // If the directory cannot be read, assume it's not empty
	}
}
/**
 * Extracts the repository name from the given URL.
 * @param url - The URL of the repository.
 * @returns The name of the repository.
 */
function getRepoNameFromUrl(url: string): string {
	try {
		const parsedUrl = new URL(url);
		const pathSegments = parsedUrl.pathname.split('/');
		return pathSegments[pathSegments.length - 1].replace('.git', '');
	} catch {
		return 'repository';
	}
}
// This method is called when your extension is deactivated
export function deactivate() {}
