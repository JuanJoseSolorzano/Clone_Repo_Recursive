/***
 * Author: Solorzano, Juan Jose
 * Date: 05-May-2024
 * Description: This is a simple VSCode extension that allows users to clone a Git repository recursively.
 * It provides a command that prompts the user for a repository URL and then executes the git clone command.
 * Vscode does not have a built-in command for cloning a repository recursively, so this extension provides that functionality.
 */

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('clonetarepo.CloneRepoTA', async ()=> {
		const repoUrl = await vscode.window.showInputBox({
			prompt: 'Enter the repository URL to clone',
			placeHolder: 'https://github.com/user/repo.git'});
		if (!repoUrl) {
			vscode.window.showErrorMessage('Repository URL is required to clone.');
			return;
		}
		try {
			await vscode.commands.executeCommand('git.clone', repoUrl, { recursive: true });
			vscode.window.showInformationMessage('Repository cloned recursively!');
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to clone repository: ${error}`);
		}
	});
	// Create and show the status bar item during activation
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = '$(repo-clone) Clone Repo TA2';
	statusBarItem.tooltip = 'Click to clone a repository recursively';
	statusBarItem.command = 'clonetarepo.CloneRepoTA'; // Optional: Keep the command for functionality
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);
	console.log('The extension "clonetarepo" is now active!');
}

// This method is called when your extension is deactivated
export function deactivate() {}
