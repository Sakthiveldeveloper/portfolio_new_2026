@echo off
echo ===================================================
echo RESTARTING GIT REPOSITORY (CLEAN SLATE)
echo ===================================================

echo Step 1: Cleaning up old git configuration...
if exist .git (
    attrib -h .git
    rmdir /s /q .git
)
if exist .git (
    echo WARNING: Could not delete .git folder fully. Close other apps and try again.
    pause
    exit
)

echo Step 2: Initializing new repository...
git init

echo Step 3: Configuring remote...
git remote add origin git@github.com:Sakthiveldeveloper/portfolio_new_2026.git

echo Step 4: Adding files...
git add .

echo Step 5: Committing...
git commit -m "Initial commit (Restarted)"

echo Step 6: Pushing to GitHub...
git branch -M main
git push -f origin main

echo ===================================================
echo DONE!
echo ===================================================
pause
