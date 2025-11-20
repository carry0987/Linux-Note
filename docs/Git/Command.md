# Git Command Reference

## Introduction

Git is more than just `git add` and `git commit -m "fix"`. Understanding Git commands is just the beginning; working effectively with Git requires developing good habits and mindset that make you a productive collaborator.

Experienced engineers view Git as a powerful tool for documenting project history, preventing disasters, and facilitating collaboration. This guide explores Git best practices and essential commands that will elevate your workflow.

---

## 1. Basic Commands

### Repository Initialization
```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone <repository-url>

# Clone with a specific branch
git clone -b <branch-name> <repository-url>
```

### Configuration
```bash
# Set user name
git config --global user.name "Your Name"

# Set user email
git config --global user.email "your.email@example.com"

# View all configurations
git config --list

# Set default branch name
git config --global init.defaultBranch main
```

---

## 2. Working with Changes

### Staging and Committing
```bash
# Check repository status
git status

# Add files to staging area
git add <file>
git add .                    # Add all changes
git add *.js                 # Add all JS files

# Remove files from staging area
git reset <file>
git reset                    # Unstage all files

# Commit changes
git commit -m "commit message"

# Commit with detailed message
git commit -m "Title" -m "Detailed description"

# Amend the last commit
git commit --amend
git commit --amend --no-edit  # Keep the same message
```

### Best Practices for Commit Messages

Follow the **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(auth): Add JWT expiration check middleware

- Ensure expired tokens return 401 Unauthorized
- Add unit tests for expired and malformed tokens
- Update documentation with example requests

Closes #123
```

**Rules:**
- **Atomic commits**: Each commit should represent one logical change
- **Descriptive messages**: Use clear, specific descriptions
- **Present tense**: "Add feature" not "Added feature"
- **Imperative mood**: "Fix bug" not "Fixes bug"

---

## 3. Branching Strategies

### Branch Operations
```bash
# List all branches
git branch
git branch -a                # Include remote branches
git branch -r                # Remote branches only

# Create a new branch
git branch <branch-name>

# Switch to a branch
git checkout <branch-name>
git switch <branch-name>     # Modern alternative

# Create and switch to a new branch
git checkout -b <branch-name>
git switch -c <branch-name>  # Modern alternative

# Rename a branch
git branch -m <old-name> <new-name>
git branch -m <new-name>     # Rename current branch

# Delete a branch
git branch -d <branch-name>  # Safe delete (merged only)
git branch -D <branch-name>  # Force delete
```

### Branching Naming Conventions

Use a consistent naming convention:

- **Feature branches**: `feature/<feature-name>` (e.g., `feature/user-profile`)
- **Bugfix branches**: `bugfix/<bug-name>` (e.g., `bugfix/payment-timeout`)
- **Hotfix branches**: `hotfix/<issue>` (e.g., `hotfix/critical-security-patch`)
- **Release branches**: `release/<version>` (e.g., `release/v1.2.0`)

**Tips:**
- Keep branches short-lived to avoid merge conflicts
- Delete branches after merging
- Use descriptive names that explain the purpose

---

## 4. Merging and Rebasing

### Merge
```bash
# Merge a branch into current branch
git merge <branch-name>

# Merge without fast-forward
git merge --no-ff <branch-name>

# Abort a merge
git merge --abort
```

### Rebase
```bash
# Rebase current branch onto another branch
git rebase <branch-name>

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue rebase after resolving conflicts
git rebase --continue

# Abort a rebase
git rebase --abort

# Skip current commit during rebase
git rebase --skip
```

### Merge vs. Rebase

**When to use Merge:**
- Preserves complete history
- Good for team collaboration
- Use for merging feature branches into main branch

**When to use Rebase:**
- Creates a linear history
- Cleaner commit history
- Good for updating feature branch with latest main branch

**⚠️ Warning:** Never rebase branches that others are working on!

```bash
# Good workflow: Rebase your feature branch before merging
git checkout feature-branch
git rebase main
git checkout main
git merge feature-branch
```

---

## 5. Viewing History

### Log Commands
```bash
# View commit history
git log

# Concise one-line format
git log --oneline

# Graph visualization
git log --oneline --graph --decorate

# Show changes in each commit
git log -p

# Show last N commits
git log -n 5

# Filter by author
git log --author="Author Name"

# Filter by date
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"

# Search commit messages
git log --grep="keyword"

# Show commits that modified a file
git log -- <file>
```

### Diff Commands
```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged
git diff --cached

# Compare two branches
git diff <branch1>..<branch2>

# Show changes in a specific file
git diff <file>

# Show changes between commits
git diff <commit1> <commit2>
```

### Blame
```bash
# Show who modified each line
git blame <file>

# Show line numbers
git blame -L 10,20 <file>

# Show author email
git blame -e <file>
```

### Bisect (Find Bugs)
```bash
# Start bisecting
git bisect start

# Mark current commit as bad
git bisect bad

# Mark a known good commit
git bisect good <commit-hash>

# After testing, mark as good or bad
git bisect good
git bisect bad

# Reset when done
git bisect reset
```

---

## 6. Remote Operations

### Remote Repository Management
```bash
# View remote repositories
git remote -v

# Add a remote repository
git remote add <name> <url>

# Remove a remote
git remote remove <name>

# Rename a remote
git remote rename <old-name> <new-name>

# Change remote URL
git remote set-url <name> <new-url>
```

### Fetch, Pull, and Push
```bash
# Fetch updates from remote
git fetch
git fetch <remote>
git fetch <remote> <branch>

# Pull changes (fetch + merge)
git pull
git pull <remote> <branch>

# Pull with rebase
git pull --rebase

# Push changes to remote
git push
git push <remote> <branch>

# Push and set upstream
git push -u origin <branch>

# Push all branches
git push --all

# Push tags
git push --tags

# Force push (use with caution!)
git push --force
git push --force-with-lease  # Safer alternative

# Delete remote branch
git push <remote> --delete <branch>
```

---

## 7. Stashing

Stash allows you to save uncommitted changes temporarily.

```bash
# Stash current changes
git stash

# Stash with a message
git stash save "Work in progress on feature X"

# List all stashes
git stash list

# Apply the most recent stash
git stash apply

# Apply and remove the most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Show stash contents
git stash show
git stash show -p  # Show full diff

# Delete a specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Create a branch from stash
git stash branch <branch-name>
```

**Workflow Example:**
```bash
# You're working on a feature when a critical bug needs fixing
git stash save "WIP: user profile feature"
git checkout main
git checkout -b hotfix/critical-bug
# Fix the bug
git commit -m "fix: resolve critical bug"
git checkout feature-branch
git stash pop
```

---

## 8. Undoing Changes

### Reset
```bash
# Unstage files (keep changes)
git reset <file>
git reset

# Reset to a specific commit (keep changes in working directory)
git reset --soft <commit>

# Reset to a specific commit (keep changes unstaged)
git reset --mixed <commit>  # Default

# Reset to a specific commit (discard all changes)
git reset --hard <commit>

# Reset to remote state
git reset --hard origin/main
```

### Revert
```bash
# Create a new commit that undoes a previous commit
git revert <commit>

# Revert without committing
git revert -n <commit>

# Revert a merge commit
git revert -m 1 <merge-commit>
```

### Restore
```bash
# Discard changes in working directory
git restore <file>

# Unstage a file
git restore --staged <file>

# Restore file from a specific commit
git restore --source=<commit> <file>
```

### Clean
```bash
# Remove untracked files (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files as well
git clean -fdx
```

---

## 9. Advanced Commands

### Reflog (Recovery)
```bash
# View reference logs
git reflog

# Recover deleted branch or commit
git reflog
git checkout <commit-hash>
git checkout -b recovered-branch

# Reflog for specific branch
git reflog show <branch>
```

**Use Case:** Accidentally deleted a branch or did a hard reset? `git reflog` is your time machine!

### Cherry-pick
```bash
# Apply a specific commit to current branch
git cherry-pick <commit>

# Cherry-pick multiple commits
git cherry-pick <commit1> <commit2>

# Cherry-pick without committing
git cherry-pick -n <commit>

# Abort cherry-pick
git cherry-pick --abort
```

### Submodules
```bash
# Add a submodule
git submodule add <repository-url> <path>

# Initialize submodules
git submodule init

# Update submodules
git submodule update

# Clone repository with submodules
git clone --recursive <repository-url>

# Update all submodules to latest
git submodule update --remote
```

### Tags
```bash
# List tags
git tag

# Create a lightweight tag
git tag <tag-name>

# Create an annotated tag
git tag -a <tag-name> -m "Tag message"

# Tag a specific commit
git tag <tag-name> <commit>

# Push tags to remote
git push origin <tag-name>
git push origin --tags

# Delete a tag
git tag -d <tag-name>

# Delete remote tag
git push origin --delete <tag-name>
```

### Worktree
```bash
# List worktrees
git worktree list

# Add a new worktree
git worktree add <path> <branch>

# Remove a worktree
git worktree remove <path>

# Prune worktree information
git worktree prune
```

---

## 10. Handling Merge Conflicts

Merge conflicts are inevitable in collaborative development.

### Resolving Conflicts
```bash
# View files with conflicts
git status

# Use merge tool
git mergetool

# After resolving, stage the files
git add <resolved-file>

# Continue merge/rebase
git merge --continue
git rebase --continue

# Abort merge/rebase
git merge --abort
git rebase --abort
```

### Conflict Markers
```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```

**Best Practices:**
- Don't panic - conflicts are normal
- Understand both changes before resolving
- Test after resolving conflicts
- Use visual merge tools when available
- Commit with descriptive messages explaining the resolution

---

## 11. Git Hooks

Automate tasks at specific points in Git workflow.

### Common Hooks

Located in `.git/hooks/`:
- `pre-commit`: Before commit is created
- `prepare-commit-msg`: Before commit message editor
- `commit-msg`: After commit message is saved
- `post-commit`: After commit is created
- `pre-push`: Before push to remote

### Example: Pre-commit Hook

Create `.git/hooks/pre-commit`:
```bash
#!/bin/sh

# Run tests before allowing commit
echo "Running tests..."
npm test || exit 1

# Run linter
echo "Running linter..."
npm run lint || exit 1

echo "All checks passed!"
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Using Husky (Recommended)

```bash
# Install husky
npm install --save-dev husky

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .git/hooks/pre-commit "npm test"
```

---

## 12. .gitignore

Specify files/directories that Git should ignore.

### Common Patterns

Create `.gitignore`:
```gitignore
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.log

# Environment files
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Compiled files
*.class
*.pyc
*.o
```

### Commands
```bash
# Remove cached files from Git (already tracked)
git rm --cached <file>
git rm -r --cached .

# Force add ignored file
git add -f <file>

# Check if file is ignored
git check-ignore -v <file>
```

---

## 13. Git Aliases

Create shortcuts for frequently used commands.

```bash
# Set aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --decorate --all'

# Use aliases
git st
git co main
git visual
```

### Recommended Aliases

```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.undo 'reset HEAD~1 --mixed'
git config --global alias.amend 'commit --amend --no-edit'
git config --global alias.contributors 'shortlog -sn'
```

---

## 14. Best Practices

### Repository Hygiene

1. **Delete merged branches**
   ```bash
   # Delete local merged branches
   git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
   
   # Delete remote merged branches
   git remote prune origin
   ```

2. **Never commit secrets**
   - Use `.gitignore` for sensitive files
   - Use environment variables
   - Consider tools like `git-secrets` or `truffleHog`

3. **Keep commits clean**
   ```bash
   # Squash commits before merging
   git rebase -i HEAD~3
   # Mark commits as 'squash' or 'fixup'
   ```

4. **Regular maintenance**
   ```bash
   # Garbage collection
   git gc
   
   # Verify repository integrity
   git fsck
   
   # Optimize repository
   git gc --aggressive
   ```

### Pull Request Best Practices

**Good PRs should:**
- Be focused and small (easier to review)
- Include clear description of changes
- Explain the "why" behind the change
- Include screenshots for UI changes
- Link to related issues
- Pass all tests and checks

**PR Template Example:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
```

### Commit Frequency

- Commit often with meaningful changes
- Don't wait until end of day to commit everything
- Use atomic commits (one logical change per commit)
- Squash "WIP" or "fix typo" commits before merging

---

## 15. Troubleshooting

### Common Issues

**1. Detached HEAD state**
```bash
# Create a branch from current state
git checkout -b new-branch-name

# Or return to a branch
git checkout main
```

**2. Accidentally committed to wrong branch**
```bash
# Move commit to a new branch
git branch new-branch
git reset HEAD~ --hard
git checkout new-branch
```

**3. Large file committed by mistake**
```bash
# Remove from history using filter-branch (old method)
git filter-branch --tree-filter 'rm -f large-file' HEAD

# Using BFG Repo-Cleaner (recommended)
bfg --delete-files large-file
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**4. Update commit author**
```bash
# For last commit
git commit --amend --author="Name <email@example.com>"

# For older commits
git rebase -i <commit-before-wrong-author>
# Mark commits as 'edit', then for each:
git commit --amend --author="Name <email@example.com>"
git rebase --continue
```

**5. Sync fork with upstream**
```bash
# Add upstream remote
git remote add upstream <original-repo-url>

# Fetch upstream
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

---

## Conclusion

Git is more than a version control system—it's a communication tool, a safety net, and a productivity multiplier. Mastering Git requires:

1. **Writing clear, atomic commits** with descriptive messages
2. **Using branches strategically** with consistent naming
3. **Understanding merge vs. rebase** and when to use each
4. **Leveraging Git history** with log, blame, and bisect
5. **Handling conflicts gracefully** with patience and care
6. **Automating workflows** with hooks and aliases
7. **Maintaining repository hygiene** with regular cleanup
8. **Creating excellent pull requests** for better collaboration

---

## Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
