import * as code from 'vscode';
import {ChildProcess} from 'child_process';
import * as fs from 'fs/promises';

export function isValidUrl(url:string|undefined): boolean {
    try{
        if(url){
            const validUrl = new URL(url.trim());
            return validUrl.hostname.length > 0;
        }else{return false}
    }catch{
        return false;
    }
}

export function createStatusBarItem(): code.StatusBarItem {
	const statusBarItem = code.window.createStatusBarItem(code.StatusBarAlignment.Left, 100);
	statusBarItem.text    = '$(repo-clone) GitModules';
	statusBarItem.tooltip = 'Click to clone a repository recursively';
	statusBarItem.command = "git-clone-with-submodules.cloneWithSubmodules";
	statusBarItem.show();
	return statusBarItem;
}

export async function canClone(storeRepoPath:string){
	if(await fs.access(storeRepoPath).then(()=>true).catch(()=>false)){
		code.window.showErrorMessage(`The folder ${storeRepoPath} already exists. Please select a different location or remove the existing folder.`);
		return;
	}
}

export async function showProgress(proc:ChildProcess,repoName:string):Promise<void>{
    try {
		await code.window.withProgress({
			location: code.ProgressLocation.Notification,
			title: `⏬ Cloning "${repoName}" ...`,
			cancellable: true
		}, (progress, token) => {
			return new Promise<void>((resolve, reject) => {
				let settled = false;
				const settle = (cb: () => void): void => {
					if (settled) {
						return;
					}
					settled = true;
					cb();
				};

				proc.on('error', (error) => {
					settle(() => {
						code.window.showErrorMessage(`Failed to clone repository: ${error.message}`);
						reject(error);
					});
				});

				proc.on('exit', (codeStatus) => {
					settle(() => {
						if (codeStatus === 0) {
							resolve();
						} else {
							code.window.showErrorMessage(`Failed to clone repository. Process exited with code ${codeStatus}`);
							reject(new Error(`Process exited with code ${codeStatus}`));
						}
					});
				});

				token.onCancellationRequested(() => {
					settle(() => {
						proc.kill();
						reject(new Error('Cloning process cancelled.'));
					});
				});

				progress.report({ increment: 0 });
				const interval = setInterval(() => {
					if (proc.killed || settled) {
						clearInterval(interval);
						return;
					}
					progress.report({ increment: 10 });
				}, 1000);

				proc.once('exit', () => {
					clearInterval(interval);
				});
			});
		});
	} catch {
		return;
	}
}