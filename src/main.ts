import * as code from 'vscode';
import * as cloneModules from "./clone_modules";

async function cloneWithSubmodule(_context:code.ExtensionContext):Promise<void>{
	const repoUrl = await code.window.showInputBox({prompt:"[ Repository URL ] ",placeHolder:"https://github.com/..."});
	if(!cloneModules.isValidUrl(repoUrl?.toString())){
		return
	}
	const userDirSelection = await code.window.showOpenDialog({
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		openLabel: 'Select folder'

	});

	if(!userDirSelection || userDirSelection.length === 0){ 
		return
	}
	const userRepoName = repoUrl?.toString().split('/').pop()?.replace('.git','');
	if(!userRepoName){ 
		return 
	}

	const storeRepoPath = userDirSelection[0].fsPath.replace(/\\/g, '/') + '/' + userRepoName;

	cloneModules.canClone(storeRepoPath);	
	const {exec} = await import("child_process")
	const proc = exec(`git clone ${repoUrl} ${storeRepoPath} --recursive -j8`);
	await cloneModules.showProgress(proc,userRepoName);

	const answer = await code.window.showWarningMessage(
		"Open the cloned repository?",
		{ modal: true },
		"Yes",
	);

	if (answer === "Yes") {
		const repoUri = code.Uri.file(storeRepoPath);
		await code.commands.executeCommand("vscode.openFolder", repoUri, false);
	}
}

export function activate(context:code.ExtensionContext){
	let gitModulesBtn = cloneModules.createStatusBarItem();
	context.subscriptions.push(gitModulesBtn);

	const command = code.commands.registerCommand('tdr-clone-with-submodules.cloneWithSubmodules',()=>cloneWithSubmodule(context));
	context.subscriptions.push(command); 
}

export function deactivate(){/* Do nothing*/}
