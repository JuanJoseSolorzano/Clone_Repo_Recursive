@echo off

title Installing Git With Submodules VS Code Extension

echo ==================================================
echo Installing Git With Submodules VS Code Extension
echo ==================================================
echo.

set "SCRIPT_DIR=%~dp0"
set "SOURCE=%SCRIPT_DIR%tdr-clone-with-submodules.vsix"
set "CODECLI=C:\LegacyApp\VSCode\bin\code.cmd"
set "OLD_EXTENSION=solorzano-juanjose.git-clone-with-submodules"

if not exist "%CODECLI%" (
    echo [ERROR] VS Code CLI not found:
    echo "%CODECLI%"
    echo.
    echo Check CODECLI path.
)

if not exist "%SOURCE%" (
    echo [ERROR] VSIX file not found:
    echo "%SOURCE%"
    echo.
    echo Put tdr-clone-with-submodules.vsix next to this installer.
)

echo [INFO] VS Code CLI:
echo "%CODECLI%"
echo.

echo [INFO] VSIX source:
echo "%SOURCE%"
echo.

echo.
echo [INFO] Installing extension...
call "%CODECLI%" --install-extension "%SOURCE%" --force 

echo [INFO] Uninstalling old extension if installed:
echo %OLD_EXTENSION%
call "%CODECLI%" --uninstall-extension "%OLD_EXTENSION%" --force

pause