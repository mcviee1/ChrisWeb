@echo off
set /p commitMessage="Enter a summary of the changes: "
git add -A
git commit -m "%commitMessage%"
pause